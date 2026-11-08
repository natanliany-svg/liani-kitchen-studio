import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useKitchenStore } from '../store/useKitchenStore';
import { PlacedModule, MaterialTheme, LightingMode, CameraPreset } from '../types/kitchen';
import { ROOM_SPEC } from '../data/roomSpec';

interface ThreeKitchenCanvasProps {
  onCaptureScreenshot?: (dataUrl: string) => void;
  overridePlanModules?: PlacedModule[]; // For comparison mode
  isMiniView?: boolean;
}

export const ThreeKitchenCanvas: React.FC<ThreeKitchenCanvasProps> = ({
  onCaptureScreenshot,
  overridePlanModules,
  isMiniView = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store state
  const storeModules = useKitchenStore(state => state.placedModules);
  const modules = overridePlanModules || storeModules;
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const selectModule = useKitchenStore(state => state.selectModule);
  const toggleDoorOpen = useKitchenStore(state => state.toggleDoorOpen);
  const theme = useKitchenStore(state => state.theme);
  const lightingMode = useKitchenStore(state => state.lightingMode);
  const cameraPreset = useKitchenStore(state => state.cameraPreset);
  const showDimensions = useKitchenStore(state => state.showDimensions);
  const showKosherColors = useKitchenStore(state => state.showKosherColors);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modulesGroupRef = useRef<THREE.Group | null>(null);
  const dimensionsGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const roomMeshGroupRef = useRef<THREE.Group | null>(null);
  const wallsRef = useRef<{
    backWall?: THREE.Mesh;
    leftWall?: THREE.Mesh;
    rightBacking?: THREE.Mesh;
    entranceWall?: THREE.Mesh;
  }>({});

  // Animation frame ref
  const animFrameIdRef = useRef<number | null>(null);

  // Theme materials helper
  const getThemeColors = useCallback((currentTheme: MaterialTheme) => {
    switch (currentTheme) {
      case 'cashmere-oak':
        return {
          carcass: 0xf5f3ee,       // Cashmere warm off-white
          front: 0xeeebe2,         // Matte cashmere
          woodAccent: 0xc89d6b,    // Warm natural oak
          countertop: 0xf7f7f5,    // Calacatta quartz
          metal: 0x333333,         // Matte graphite
          pillar: 0xe5e2da,        // Architectural concrete plaster
          floor: 0xdcd8cd          // Large format light greige porcelain
        };
      case 'sahara-bronze':
        return {
          carcass: 0xeae5dc,
          front: 0xd9cebe,         // Sahara sand
          woodAccent: 0x8b5a2b,    // Walnut
          countertop: 0x3d3936,    // Dark bronze stone
          metal: 0x997755,         // Brushed bronze
          pillar: 0xd5cebe,
          floor: 0xc7bea9
        };
      case 'dark-graphite':
        return {
          carcass: 0x2a2b2e,
          front: 0x34373d,         // Dark graphite matte
          woodAccent: 0xaa7c4f,    // Smoked oak
          countertop: 0x1f2022,    // Nero marquina quartz
          metal: 0x111111,         // Black steel
          pillar: 0x44474d,
          floor: 0x242629
        };
      case 'pure-white':
      default:
        return {
          carcass: 0xffffff,
          front: 0xfbfbfb,         // Ultra matte white
          woodAccent: 0xddb88c,    // Scandinavian pale oak
          countertop: 0xf8f8f9,    // Pure white quartz
          metal: 0x888888,         // Satin aluminum
          pillar: 0xededed,
          floor: 0xeeeeee
        };
    }
  }, []);

  // Update Lighting
  const updateLights = useCallback((mode: LightingMode) => {
    const lightsGroup = lightsGroupRef.current;
    if (!lightsGroup) return;

    // Clear old lights
    while (lightsGroup.children.length > 0) {
      lightsGroup.remove(lightsGroup.children[0]);
    }

    let ambientColor = 0xffffff;
    let ambientIntensity = 0.9;
    let sunColor = 0xfffaed;
    let sunIntensity = 1.6;
    let taskLedColor = 0xfff0dd;
    let taskLedIntensity = 1.2;

    if (mode === 'task-led') {
      ambientIntensity = 0.6;
      sunIntensity = 0.8;
      taskLedIntensity = 2.4;
      taskLedColor = 0xffffff; // Crisp 4000K task lighting
    } else if (mode === 'warm-ambient') {
      ambientColor = 0xffeedd;
      ambientIntensity = 0.7;
      sunIntensity = 0.5;
      taskLedIntensity = 1.8;
      taskLedColor = 0xffaa55; // 2700K warm cozy
    } else if (mode === 'shabbat') {
      ambientColor = 0xffdfb0;
      ambientIntensity = 0.85;
      sunIntensity = 0.4;
      taskLedIntensity = 1.5;
      taskLedColor = 0xffc477;
    }

    // Ambient
    const ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    lightsGroup.add(ambient);

    // Directional (Window & Dining Area)
    const sunLight = new THREE.DirectionalLight(sunColor, sunIntensity);
    sunLight.position.set(400, 350, 200);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 50;
    sunLight.shadow.camera.far = 1200;
    sunLight.shadow.camera.left = -400;
    sunLight.shadow.camera.right = 400;
    sunLight.shadow.camera.top = 400;
    sunLight.shadow.camera.bottom = -400;
    sunLight.shadow.bias = -0.0005;
    lightsGroup.add(sunLight);

    // LED Task Strips along Meat Niche 2
    const meatLed = new THREE.PointLight(taskLedColor, taskLedIntensity, 350);
    meatLed.position.set(40, 145, 420);
    lightsGroup.add(meatLed);

    // LED Task Strip along Dairy Wall
    const dairyLed = new THREE.PointLight(taskLedColor, taskLedIntensity, 400);
    dairyLed.position.set(160, 145, 660);
    lightsGroup.add(dairyLed);

    // Plinth / Kickboard Accent Light (צוקל צף)
    const plinthLight = new THREE.PointLight(0xffecd0, 0.8, 250);
    plinthLight.position.set(160, 15, 400);
    lightsGroup.add(plinthLight);
  }, []);

  // Build Room Envelope (Walls, Floor, Pillars)
  const buildRoomEnvelope = useCallback(() => {
    const group = roomMeshGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const colors = getThemeColors(theme);
    const wallMat = new THREE.MeshStandardMaterial({
      color: colors.pillar,
      roughness: 0.85,
      metalness: 0.05
    });

    const pillarMat = new THREE.MeshStandardMaterial({
      color: colors.pillar,
      roughness: 0.9,
      metalness: 0.05
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: colors.floor,
      roughness: 0.35,
      metalness: 0.1
    });

    // 1. Floor: 317 cm x 705 cm
    const floorGeo = new THREE.PlaneGeometry(ROOM_SPEC.widthCm, ROOM_SPEC.depthCm);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(ROOM_SPEC.widthCm / 2, 0, ROOM_SPEC.depthCm / 2);
    floorMesh.receiveShadow = true;
    group.add(floorMesh);

    // Floor Tile Grid helper (60cm x 60cm tiles)
    const tileGrid = new THREE.GridHelper(720, 12, 0xb0aaa0, 0xd0cbc0);
    tileGrid.position.set(ROOM_SPEC.widthCm / 2, 0.1, ROOM_SPEC.depthCm / 2);
    group.add(tileGrid);

    // 2. Back Wall (317 cm x 246 cm, solid, no windows)
    const backWallGeo = new THREE.BoxGeometry(ROOM_SPEC.widthCm, ROOM_SPEC.heightCm, 12);
    const backWallMesh = new THREE.Mesh(backWallGeo, wallMat);
    backWallMesh.position.set(ROOM_SPEC.widthCm / 2, ROOM_SPEC.heightCm / 2, ROOM_SPEC.depthCm + 6);
    backWallMesh.receiveShadow = true;
    group.add(backWallMesh);

    // 3. Left Wall (705 cm x 246 cm)
    const leftWallGeo = new THREE.BoxGeometry(12, ROOM_SPEC.heightCm, ROOM_SPEC.depthCm);
    const leftWallMesh = new THREE.Mesh(leftWallGeo, wallMat);
    leftWallMesh.position.set(ROOM_SPEC.widthCm + 6, ROOM_SPEC.heightCm / 2, ROOM_SPEC.depthCm / 2);
    leftWallMesh.receiveShadow = true;
    group.add(leftWallMesh);

    // 4. Right Wall Backing (behind the 3 niches)
    const rightBackingGeo = new THREE.BoxGeometry(12, ROOM_SPEC.heightCm, ROOM_SPEC.depthCm);
    const rightBackingMesh = new THREE.Mesh(rightBackingGeo, wallMat);
    rightBackingMesh.position.set(-6, ROOM_SPEC.heightCm / 2, ROOM_SPEC.depthCm / 2);
    group.add(rightBackingMesh);

    // 5. Entrance Return Wall (50 cm depth x 89 cm width architectural jamb)
    const entWallGeo = new THREE.BoxGeometry(89, ROOM_SPEC.heightCm, 20);
    const entWallMesh = new THREE.Mesh(entWallGeo, wallMat);
    entWallMesh.position.set(89 / 2, ROOM_SPEC.heightCm / 2, -10);
    entWallMesh.receiveShadow = true;
    group.add(entWallMesh);

    wallsRef.current = {
      backWall: backWallMesh,
      leftWall: leftWallMesh,
      rightBacking: rightBackingMesh,
      entranceWall: entWallMesh
    };

    // 6. Structural Pillars (89 cm deep into room x 25 cm wide along wall)
    ROOM_SPEC.pillars.forEach((p) => {
      const pGeo = new THREE.BoxGeometry(p.width, p.height, p.depth);
      const pMesh = new THREE.Mesh(pGeo, pillarMat);
      // Pivot centered in box:
      pMesh.position.set(p.width / 2, p.height / 2, p.z + p.depth / 2);
      pMesh.castShadow = true;
      pMesh.receiveShadow = true;
      group.add(pMesh);

      // Label pillar top edge
      const edgeGeo = new THREE.EdgesGeometry(pGeo);
      const edgeLine = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0x999999, linewidth: 2 }));
      edgeLine.position.copy(pMesh.position);
      group.add(edgeLine);
    });

    // 7. Ceiling Perimeter Edge (Open ceiling for aerial 3D visibility)
    const ceilingEdgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(ROOM_SPEC.widthCm, 2, ROOM_SPEC.depthCm));
    const ceilingEdgeMesh = new THREE.LineSegments(
      ceilingEdgeGeo, 
      new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.6 })
    );
    ceilingEdgeMesh.position.set(ROOM_SPEC.widthCm / 2, ROOM_SPEC.heightCm, ROOM_SPEC.depthCm / 2);
    group.add(ceilingEdgeMesh);
  }, [theme, getThemeColors]);

  // Build Modules Mesh Representation with verified world coordinates matching CAD and physics
  const buildModules = useCallback(() => {
    const group = modulesGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const colors = getThemeColors(theme);

    modules.forEach((mod) => {
      const isSelected = mod.id === selectedModuleId;
      const modGroup = new THREE.Group();
      modGroup.name = `module-${mod.id}`;
      (modGroup as unknown as { userData: { moduleId: string } }).userData = { moduleId: mod.id };

      // Determine Front Color: theme based or Kosher indicator
      let frontHex = colors.front;
      if (showKosherColors) {
        if (mod.kosherZone === 'meat') frontHex = 0xd9534f; // Burgundy red
        else if (mod.kosherZone === 'dairy') frontHex = 0x337ab7; // Deep cyan blue
        else if (mod.kosherZone === 'pareve') frontHex = 0x5cb85c; // Natural sage green
      }

      const carcassMat = new THREE.MeshStandardMaterial({
        color: colors.carcass,
        roughness: 0.6,
        metalness: 0.1
      });

      const frontMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xffcc00 : frontHex,
        roughness: 0.45,
        metalness: 0.15,
        emissive: isSelected ? 0x332200 : 0x000000
      });

      const countertopMat = new THREE.MeshStandardMaterial({
        color: colors.countertop,
        roughness: 0.25,
        metalness: 0.1
      });

      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.2,
        metalness: 0.85
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: 0.1,
        transmission: 0.7,
        thickness: 2
      });

      const { width, height, depth } = mod.dimensions;
      const openPercent = mod.openPercent || 0;

      if (mod.category === 'furniture') {
        // Dining Table and Chairs: width along X, height along Y, depth along Z
        const topGeo = new THREE.BoxGeometry(width, 4, depth);
        const woodMat = new THREE.MeshStandardMaterial({ color: colors.woodAccent, roughness: 0.4 });
        const topMesh = new THREE.Mesh(topGeo, woodMat);
        topMesh.position.set(width / 2, height - 2, depth / 2);
        topMesh.castShadow = true;
        modGroup.add(topMesh);

        // 4 Legs
        const legGeo = new THREE.CylinderGeometry(3.5, 2.5, height - 4);
        const legOffsets = [
          [8, 8],
          [width - 8, 8],
          [8, depth - 8],
          [width - 8, depth - 8]
        ];
        legOffsets.forEach(([lx, lz]) => {
          const legMesh = new THREE.Mesh(legGeo, woodMat);
          legMesh.position.set(lx, (height - 4) / 2, lz);
          legMesh.castShadow = true;
          modGroup.add(legMesh);
        });

        // Chairs around table
        const chairCount = depth > 180 ? 8 : 6;
        for (let i = 0; i < chairCount; i++) {
          const chairGroup = new THREE.Group();
          const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(42, 4, 42), woodMat);
          seatMesh.position.set(0, 46, 0);
          chairGroup.add(seatMesh);

          const backMesh = new THREE.Mesh(new THREE.BoxGeometry(42, 42, 4), woodMat);
          backMesh.position.set(0, 68, 19);
          chairGroup.add(backMesh);

          const side = i % 2 === 0 ? -1 : 1;
          const posAlong = (Math.floor(i / 2) + 0.5) * (depth / (chairCount / 2));
          chairGroup.position.set(width / 2 + side * 35, 0, posAlong);
          chairGroup.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
          modGroup.add(chairGroup);
        }
      } else if (mod.rotation === 90) {
        // Right wall niches: depth along X (0..depth), height along Y (0..height), width along Z (0..width)
        // Front face is at local X = depth, facing +X into room
        const carcassGeo = new THREE.BoxGeometry(depth, height, width);
        const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
        carcassMesh.position.set(depth / 2, height / 2, width / 2);
        carcassMesh.castShadow = true;
        carcassMesh.receiveShadow = true;
        modGroup.add(carcassMesh);

        // Countertop Slab if Base Unit
        if (mod.category === 'base') {
          const ctGeo = new THREE.BoxGeometry(depth + 2, 3.5, width);
          const ctMesh = new THREE.Mesh(ctGeo, countertopMat);
          ctMesh.position.set(depth / 2 + 1, height - 1.75, width / 2);
          ctMesh.castShadow = true;
          modGroup.add(ctMesh);

          // Sink or Cooktop Cutouts
          if (mod.applianceType === 'sink') {
            const basinGeo = new THREE.BoxGeometry(depth * 0.65, 18, width * 0.75);
            const basinMesh = new THREE.Mesh(basinGeo, metalMat);
            basinMesh.position.set(depth / 2, height - 9, width / 2);
            modGroup.add(basinMesh);

            const faucetGeo = new THREE.CylinderGeometry(1.5, 1.5, 32);
            const faucetMesh = new THREE.Mesh(faucetGeo, metalMat);
            faucetMesh.position.set(depth / 2 - 12, height + 16, width / 2);
            modGroup.add(faucetMesh);
          } else if (mod.applianceType === 'cooktop') {
            const hobPlate = new THREE.Mesh(new THREE.BoxGeometry(depth * 0.75, 0.8, width * 0.85), glassMat);
            hobPlate.position.set(depth / 2, height + 0.4, width / 2);
            modGroup.add(hobPlate);

            const ringGeo = new THREE.RingGeometry(4, 9, 24);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xff3300, side: THREE.DoubleSide });
            const ring1 = new THREE.Mesh(ringGeo, ringMat);
            ring1.rotation.x = -Math.PI / 2;
            ring1.position.set(depth / 2, height + 0.9, width / 2 - 18);
            const ring2 = new THREE.Mesh(ringGeo, ringMat);
            ring2.rotation.x = -Math.PI / 2;
            ring2.position.set(depth / 2, height + 0.9, width / 2 + 18);
            modGroup.add(ring1);
            modGroup.add(ring2);
          }
        }

        // Appliance details (Fridge, Freezer)
        if (mod.applianceType === 'fridge' || mod.applianceType === 'freezer') {
          const splitLine = new THREE.Mesh(new THREE.BoxGeometry(2, height * 0.95, 0.8), metalMat);
          splitLine.position.set(depth + 0.5, height / 2, width / 2);
          modGroup.add(splitLine);

          const handleGeo = new THREE.CylinderGeometry(1.2, 1.2, height * 0.4);
          const handle1 = new THREE.Mesh(handleGeo, metalMat);
          handle1.position.set(depth + 3, height * 0.55, width / 2 - 6);
          const handle2 = new THREE.Mesh(handleGeo, metalMat);
          handle2.position.set(depth + 3, height * 0.55, width / 2 + 6);
          modGroup.add(handle1);
          modGroup.add(handle2);
        }

        // Kinetic Doors / Drawers for Right Wall
        const doorPivot = new THREE.Group();
        if (mod.doorType === 'drawers') {
          doorPivot.position.set(openPercent * 35, 0, 0);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 8, width - 0.8), frontMat);
          frontMesh.position.set(depth + 0.9, height / 2, width / 2);
          doorPivot.add(frontMesh);

          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, width * 0.5), metalMat);
          handle.position.set(depth + 3, height * 0.7, width / 2);
          doorPivot.add(handle);
        } else if (mod.doorType === 'lift-up') {
          doorPivot.position.set(depth, height, 0);
          doorPivot.rotation.z = openPercent * (Math.PI / 2.2);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 0.8, width - 0.8), frontMat);
          frontMesh.position.set(0.9, -height / 2, width / 2);
          doorPivot.add(frontMesh);
        } else if (mod.doorType === 'double-door') {
          const angle = openPercent * (Math.PI / 1.7);
          const leftPivot = new THREE.Group();
          leftPivot.position.set(depth, 0, 0);
          leftPivot.rotation.y = angle;
          const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 0.5), frontMat);
          leftDoor.position.set(0.9, height / 2, width / 4);
          leftPivot.add(leftDoor);

          const rightPivot = new THREE.Group();
          rightPivot.position.set(depth, 0, width);
          rightPivot.rotation.y = -angle;
          const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 0.5), frontMat);
          rightDoor.position.set(0.9, height / 2, -width / 4);
          rightPivot.add(rightDoor);

          doorPivot.add(leftPivot);
          doorPivot.add(rightPivot);
        } else if (mod.doorType === 'pocket') {
          const slide = openPercent * (width * 0.45);
          const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 1), frontMat);
          leftDoor.position.set(depth + 0.9, height / 2, width / 4 - slide);
          const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 1), frontMat);
          rightDoor.position.set(depth + 0.9, height / 2, (3 * width) / 4 + slide);
          doorPivot.add(leftDoor);
          doorPivot.add(rightDoor);
        } else if (mod.doorType !== 'none') {
          doorPivot.position.set(depth, 0, 0);
          doorPivot.rotation.y = openPercent * (Math.PI / 1.7);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width - 0.8), frontMat);
          frontMesh.position.set(0.9, height / 2, width / 2);
          doorPivot.add(frontMesh);
        }
        modGroup.add(doorPivot);

      } else if (mod.rotation === 0) {
        // Back wall modules: width along X (0..width), height along Y (0..height), depth along Z (0..depth)
        // Front face is at local Z = 0, facing -Z into room towards entrance
        const carcassGeo = new THREE.BoxGeometry(width, height, depth);
        const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
        carcassMesh.position.set(width / 2, height / 2, depth / 2);
        carcassMesh.castShadow = true;
        carcassMesh.receiveShadow = true;
        modGroup.add(carcassMesh);

        if (mod.category === 'base') {
          const ctGeo = new THREE.BoxGeometry(width, 3.5, depth + 2);
          const ctMesh = new THREE.Mesh(ctGeo, countertopMat);
          ctMesh.position.set(width / 2, height - 1.75, depth / 2 - 1);
          ctMesh.castShadow = true;
          modGroup.add(ctMesh);

          if (mod.applianceType === 'sink') {
            const basinGeo = new THREE.BoxGeometry(width * 0.75, 18, depth * 0.65);
            const basinMesh = new THREE.Mesh(basinGeo, metalMat);
            basinMesh.position.set(width / 2, height - 9, depth / 2);
            modGroup.add(basinMesh);

            const faucetGeo = new THREE.CylinderGeometry(1.5, 1.5, 32);
            const faucetMesh = new THREE.Mesh(faucetGeo, metalMat);
            faucetMesh.position.set(width / 2, height + 16, depth / 2 + 12);
            modGroup.add(faucetMesh);
          }
        }

        // Kinetic Doors / Drawers for Back Wall
        const doorPivot = new THREE.Group();
        if (mod.doorType === 'drawers') {
          doorPivot.position.set(0, 0, -openPercent * 35);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(width - 0.8, height - 8, 1.8), frontMat);
          frontMesh.position.set(width / 2, height / 2, -0.9);
          doorPivot.add(frontMesh);

          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, width * 0.5), metalMat);
          handle.rotation.z = Math.PI / 2;
          handle.position.set(width / 2, height * 0.7, -3);
          doorPivot.add(handle);
        } else if (mod.doorType === 'lift-up') {
          doorPivot.position.set(0, height, 0);
          doorPivot.rotation.x = -openPercent * (Math.PI / 2.2);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(width - 0.8, height - 0.8, 1.8), frontMat);
          frontMesh.position.set(width / 2, -height / 2, -0.9);
          doorPivot.add(frontMesh);
        } else if (mod.doorType === 'double-door') {
          const angle = openPercent * (Math.PI / 1.7);
          const leftPivot = new THREE.Group();
          leftPivot.position.set(0, 0, 0);
          leftPivot.rotation.y = -angle;
          const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - 0.5, height - 2, 1.8), frontMat);
          leftDoor.position.set(width / 4, height / 2, -0.9);
          leftPivot.add(leftDoor);

          const rightPivot = new THREE.Group();
          rightPivot.position.set(width, 0, 0);
          rightPivot.rotation.y = angle;
          const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - 0.5, height - 2, 1.8), frontMat);
          rightDoor.position.set(-width / 4, height / 2, -0.9);
          rightPivot.add(rightDoor);

          doorPivot.add(leftPivot);
          doorPivot.add(rightPivot);
        } else if (mod.doorType === 'pocket') {
          const slide = openPercent * (width * 0.45);
          const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - 1, height - 2, 1.8), frontMat);
          leftDoor.position.set(width / 4 - slide, height / 2, -0.9);
          const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - 1, height - 2, 1.8), frontMat);
          rightDoor.position.set((3 * width) / 4 + slide, height / 2, -0.9);
          doorPivot.add(leftDoor);
          doorPivot.add(rightDoor);
        } else if (mod.doorType !== 'none') {
          doorPivot.position.set(0, 0, 0);
          doorPivot.rotation.y = -openPercent * (Math.PI / 1.7);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(width - 0.8, height - 2, 1.8), frontMat);
          frontMesh.position.set(width / 2, height / 2, -0.9);
          doorPivot.add(frontMesh);
        }
        modGroup.add(doorPivot);

      } else if (mod.rotation === 270) {
        // Left wall modules: depth along X (0..depth), height along Y (0..height), width along Z (0..width)
        // Front face is at local X = 0, facing -X into room towards center
        const carcassGeo = new THREE.BoxGeometry(depth, height, width);
        const carcassMesh = new THREE.Mesh(carcassGeo, carcassMat);
        carcassMesh.position.set(depth / 2, height / 2, width / 2);
        carcassMesh.castShadow = true;
        carcassMesh.receiveShadow = true;
        modGroup.add(carcassMesh);

        if (mod.category === 'base') {
          const ctGeo = new THREE.BoxGeometry(depth + 2, 3.5, width);
          const ctMesh = new THREE.Mesh(ctGeo, countertopMat);
          ctMesh.position.set(depth / 2 - 1, height - 1.75, width / 2);
          ctMesh.castShadow = true;
          modGroup.add(ctMesh);
        }

        if (mod.applianceType === 'oven') {
          const ovenGlass = new THREE.Mesh(new THREE.BoxGeometry(2, 45, 54), glassMat);
          ovenGlass.position.set(-1, 95, width / 2);
          modGroup.add(ovenGlass);

          const ovenHandle = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 46), metalMat);
          ovenHandle.position.set(-4, 114, width / 2);
          modGroup.add(ovenHandle);
        }

        // Kinetic Doors / Drawers for Left Wall
        const doorPivot = new THREE.Group();
        if (mod.doorType === 'drawers') {
          doorPivot.position.set(-openPercent * 35, 0, 0);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 8, width - 0.8), frontMat);
          frontMesh.position.set(-0.9, height / 2, width / 2);
          doorPivot.add(frontMesh);

          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, width * 0.5), metalMat);
          handle.position.set(-3, height * 0.7, width / 2);
          doorPivot.add(handle);
        } else if (mod.doorType === 'lift-up') {
          doorPivot.position.set(0, height, 0);
          doorPivot.rotation.z = -openPercent * (Math.PI / 2.2);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 0.8, width - 0.8), frontMat);
          frontMesh.position.set(-0.9, -height / 2, width / 2);
          doorPivot.add(frontMesh);
        } else if (mod.doorType === 'double-door') {
          const angle = openPercent * (Math.PI / 1.7);
          const leftPivot = new THREE.Group();
          leftPivot.position.set(0, 0, 0);
          leftPivot.rotation.y = -angle;
          const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 0.5), frontMat);
          leftDoor.position.set(-0.9, height / 2, width / 4);
          leftPivot.add(leftDoor);

          const rightPivot = new THREE.Group();
          rightPivot.position.set(0, 0, width);
          rightPivot.rotation.y = angle;
          const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width / 2 - 0.5), frontMat);
          rightDoor.position.set(-0.9, height / 2, -width / 4);
          rightPivot.add(rightDoor);

          doorPivot.add(leftPivot);
          doorPivot.add(rightPivot);
        } else if (mod.doorType !== 'none') {
          doorPivot.position.set(0, 0, 0);
          doorPivot.rotation.y = -openPercent * (Math.PI / 1.7);
          const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, height - 2, width - 0.8), frontMat);
          frontMesh.position.set(-0.9, height / 2, width / 2);
          doorPivot.add(frontMesh);
        }
        modGroup.add(doorPivot);
      }

      // Selection Outline Box
      if (isSelected) {
        const isRot = mod.rotation === 90 || mod.rotation === 270;
        const bW = isRot ? depth : width;
        const bH = height;
        const bD = isRot ? width : depth;
        const wireGeo = new THREE.BoxGeometry(bW + 2, bH + 2, bD + 2);
        const wireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, linewidth: 3 });
        const wire = new THREE.LineSegments(new THREE.EdgesGeometry(wireGeo), wireMat);
        wire.position.set(bW / 2, bH / 2, bD / 2);
        modGroup.add(wire);
      }

      // Exact World Coordinates matching CAD and validation
      modGroup.position.set(mod.position[0], mod.position[1], mod.position[2]);
      group.add(modGroup);
    });
  }, [modules, selectedModuleId, theme, showKosherColors, getThemeColors]);

  // Dimension ribbons renderer
  const renderDimensionLines = useCallback(() => {
    const group = dimensionsGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (!showDimensions) return;

    // Helper to draw clean CAD dimension line with tick marks
    const createDimLine = (p1: THREE.Vector3, p2: THREE.Vector3, color = 0x0077ff) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, linewidth: 2 }));
      group.add(line);

      // Arrowheads / tick marks
      const tickMat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
      const dir = p2.clone().sub(p1).normalize();
      const perp = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(4);

      const tick1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1.clone().sub(perp), p1.clone().add(perp)]), tickMat);
      const tick2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([p2.clone().sub(perp), p2.clone().add(perp)]), tickMat);
      group.add(tick1);
      group.add(tick2);
    };

    // Right Wall Niche Ribbons
    createDimLine(new THREE.Vector3(-15, 20, 0), new THREE.Vector3(-15, 20, 263), 0x228833);   // Niche 1: 263
    createDimLine(new THREE.Vector3(-15, 20, 263), new THREE.Vector3(-15, 20, 288), 0xcc6600); // Pillar 1: 25
    createDimLine(new THREE.Vector3(-15, 20, 288), new THREE.Vector3(-15, 20, 556), 0xd9534f); // Niche 2: 268
    createDimLine(new THREE.Vector3(-15, 20, 556), new THREE.Vector3(-15, 20, 581), 0xcc6600); // Pillar 2: 25
    createDimLine(new THREE.Vector3(-15, 20, 581), new THREE.Vector3(-15, 20, 705), 0x228833); // Niche 3: 124

    // Back Wall Ribbon: 317 cm
    createDimLine(new THREE.Vector3(0, 20, 720), new THREE.Vector3(317, 20, 720), 0x337ab7);

    // Left Wall Active Zone Ribbon: 240 cm
    createDimLine(new THREE.Vector3(330, 20, 705), new THREE.Vector3(330, 20, 465), 0x9955bb);
  }, [showDimensions]);

  // Set Camera Preset Position & LookAt with wall occlusion management
  const applyCameraPreset = useCallback((preset: CameraPreset) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    controls.reset();

    // Reset all walls to visible
    if (wallsRef.current.leftWall) wallsRef.current.leftWall.visible = true;
    if (wallsRef.current.rightBacking) wallsRef.current.rightBacking.visible = true;
    if (wallsRef.current.backWall) wallsRef.current.backWall.visible = true;
    if (wallsRef.current.entranceWall) wallsRef.current.entranceWall.visible = true;

    switch (preset) {
      case 'eye-level':
        camera.position.set(160, 155, 120);
        controls.target.set(160, 130, 550);
        break;
      case 'seated':
        camera.position.set(220, 115, 250);
        controls.target.set(50, 100, 420);
        break;
      case 'top-down':
        camera.position.set(160, 950, 350);
        controls.target.set(160, 0, 350);
        break;
      case 'elevation-north': // Back Wall (Dairy)
        if (wallsRef.current.entranceWall) wallsRef.current.entranceWall.visible = false;
        camera.position.set(158.5, 123, 100);
        controls.target.set(158.5, 123, 705);
        break;
      case 'elevation-east': // Meat Wall (Right) - hide left wall to allow direct view
        if (wallsRef.current.leftWall) wallsRef.current.leftWall.visible = false;
        camera.position.set(450, 123, 350);
        controls.target.set(0, 123, 350);
        break;
      case 'elevation-west': // Left Wall - hide right wall backing to allow direct view
        if (wallsRef.current.rightBacking) wallsRef.current.rightBacking.visible = false;
        camera.position.set(-150, 123, 350);
        controls.target.set(317, 123, 350);
        break;
      case 'elevation-south': // Looking toward entrance - hide back wall
        if (wallsRef.current.backWall) wallsRef.current.backWall.visible = false;
        camera.position.set(158.5, 123, 800);
        controls.target.set(158.5, 123, 0);
        break;
      case 'station-meat':
        camera.position.set(120, 145, 420);
        controls.target.set(20, 110, 420);
        break;
      case 'station-dairy':
        camera.position.set(160, 145, 520);
        controls.target.set(160, 110, 680);
        break;
      case 'station-dining':
        camera.position.set(160, 155, 300);
        controls.target.set(220, 90, 220);
        break;
      case 'orbit':
      default:
        camera.position.set(220, 260, -90);
        controls.target.set(160, 110, 360);
        break;
    }

    camera.updateProjectionMatrix();
    controls.update();
  }, []);

  // Raycasting Click Interaction (Select module & toggle door)
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const camera = cameraRef.current;
    const group = modulesGroupRef.current;
    if (!canvas || !camera || !group) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersects = raycaster.intersectObjects(group.children, true);
    if (intersects.length > 0) {
      let curr: THREE.Object3D | null = intersects[0].object;
      while (curr && curr.parent && curr.parent !== group) {
        curr = curr.parent;
      }
      if (curr && (curr as unknown as { userData: { moduleId?: string } }).userData?.moduleId) {
        const targetId = (curr as unknown as { userData: { moduleId: string } }).userData.moduleId;
        selectModule(targetId);
        // Double-click or quick click opens door
        if (e.detail === 2) {
          toggleDoorOpen(targetId);
        }
      }
    } else {
      selectModule(null);
    }
  }, [selectModule, toggleDoorOpen]);

  // Initial Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f7f9);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(48, width / height, 5, 3000);
    camera.position.set(220, 260, -90);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(160, 110, 360);
    controls.minDistance = 30;
    controls.maxDistance = 1800;
    controls.maxPolarAngle = Math.PI / 2 + 0.02; // Don't flip under floor
    controlsRef.current = controls;

    // Groups
    const roomMeshGroup = new THREE.Group();
    scene.add(roomMeshGroup);
    roomMeshGroupRef.current = roomMeshGroup;

    const modulesGroup = new THREE.Group();
    scene.add(modulesGroup);
    modulesGroupRef.current = modulesGroup;

    const dimensionsGroup = new THREE.Group();
    scene.add(dimensionsGroup);
    dimensionsGroupRef.current = dimensionsGroup;

    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();

      // Dynamic smart wall culling: hide exterior walls when camera is outside them so they NEVER block view or mouse clicks!
      if (wallsRef.current) {
        const { leftWall, rightBacking, backWall, entranceWall } = wallsRef.current;
        if (leftWall) leftWall.visible = camera.position.x <= ROOM_SPEC.widthCm + 35;
        if (rightBacking) rightBacking.visible = camera.position.x >= -35;
        if (backWall) backWall.visible = camera.position.z <= ROOM_SPEC.depthCm + 35;
        if (entranceWall) entranceWall.visible = camera.position.z >= -35;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Room Geometry when theme changes
  useEffect(() => {
    buildRoomEnvelope();
  }, [buildRoomEnvelope]);

  // Update Lights when lightingMode changes
  useEffect(() => {
    updateLights(lightingMode);
  }, [lightingMode, updateLights]);

  // Update Modules when modules/selection/theme/kosher toggles change
  useEffect(() => {
    buildModules();
    renderDimensionLines();
  }, [buildModules, renderDimensionLines]);

  // Apply Camera Presets
  useEffect(() => {
    applyCameraPreset(cameraPreset);
  }, [cameraPreset, applyCameraPreset]);

  // Expose Screenshot capability
  const captureScreenshot = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const dataUrl = renderer.domElement.toDataURL('image/png');
    if (onCaptureScreenshot) onCaptureScreenshot(dataUrl);
    return dataUrl;
  }, [onCaptureScreenshot]);

  // Provide screenshot method to window for global export triggers
  useEffect(() => {
    (window as unknown as { captureStudio3D?: () => string | undefined }).captureStudio3D = captureScreenshot;
  }, [captureScreenshot]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none bg-slate-100">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
      />
      {!isMiniView && (
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] sm:text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 pointer-events-none max-w-[calc(100%-24px)]">
          <span className="hidden sm:inline">🖱️ גרור לסיבוב | גלגל לזום | לחיצה כפולה לפתיחה</span>
          <span className="sm:hidden">סיבוב במגע | H=246 ס"מ</span>
          <span className="text-amber-400 font-medium hidden sm:inline">| H=246 ס"מ (317×705)</span>
        </div>
      )}
    </div>
  );
};
