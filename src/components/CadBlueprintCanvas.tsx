import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { PlacedModule, WallId } from '../types/kitchen';
import { ROOM_SPEC, NICHE_BOUNDS } from '../data/roomSpec';
import { validateKitchen } from '../core/validation';
import { jsPDF } from 'jspdf';

interface CadBlueprintCanvasProps {
  overridePlanModules?: PlacedModule[];
  isMiniView?: boolean;
}

export const CadBlueprintCanvas: React.FC<CadBlueprintCanvasProps> = ({
  overridePlanModules,
  isMiniView = false
}) => {
  const storeModules = useKitchenStore(state => state.placedModules);
  const modules = overridePlanModules || storeModules;
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const selectModule = useKitchenStore(state => state.selectModule);
  const updateModule = useKitchenStore(state => state.updateModule);
  const activePlan = useKitchenStore(state => state.activePlan);
  const showKosherColors = useKitchenStore(state => state.showKosherColors);
  const showDimensions = useKitchenStore(state => state.showDimensions);

  const validationIssues = useMemo(() => validateKitchen(modules), [modules]);

  const svgRef = useRef<SVGSVGElement>(null);

  // Pan & Zoom state
  const [viewBox, setViewBox] = useState({ x: -80, y: -60, width: 480, height: 840 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dragging module along wall state
  const [draggingModuleId, setDraggingModuleId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, z: 0 });
  const [activeSnapGuide, setActiveSnapGuide] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // Multitouch pointers for mobile/tablet pinch-to-zoom
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartViewBoxRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  // Zoom handlers
  const handleZoom = (factor: number) => {
    setViewBox(prev => ({
      x: prev.x + (prev.width * (1 - factor)) / 2,
      y: prev.y + (prev.height * (1 - factor)) / 2,
      width: prev.width * factor,
      height: prev.height * factor
    }));
  };

  const handleResetZoom = () => {
    setViewBox({ x: -80, y: -60, width: 480, height: 840 });
  };

  // Pointer down (mouse or touch)
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Multi-touch pinch zoom detection (2 fingers)
    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStartDistRef.current = dist;
      pinchStartViewBoxRef.current = { ...viewBox };
      setIsPanning(false);
      return;
    }

    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === 'rect') {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      (e.target as Element).setPointerCapture?.(e.pointerId);
    }
  };

  // Pointer move (panning, dragging, or pinch-zoom)
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // 2-finger pinch zoom
    if (activePointersRef.current.size === 2 && pinchStartDistRef.current && pinchStartViewBoxRef.current) {
      const pts = Array.from(activePointersRef.current.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ratio = pinchStartDistRef.current / Math.max(currentDist, 10);
      const startVb = pinchStartViewBoxRef.current;
      setViewBox({
        x: startVb.x + (startVb.width * (1 - ratio)) / 2,
        y: startVb.y + (startVb.height * (1 - ratio)) / 2,
        width: Math.max(100, Math.min(startVb.width * ratio, 1200)),
        height: Math.max(150, Math.min(startVb.height * ratio, 1800))
      });
      return;
    }

    if (isPanning) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const dx = (e.clientX - panStart.x) * (viewBox.width / rect.width);
      const dy = (e.clientY - panStart.y) * (viewBox.height / rect.height);
      setViewBox(prev => ({
        ...prev,
        x: prev.x - dx,
        y: prev.y - dy
      }));
      setPanStart({ x: e.clientX, y: e.clientY });
    } else if (draggingModuleId) {
      const targetMod = modules.find(m => m.id === draggingModuleId);
      if (!targetMod) return;

      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const clickSvgX = viewBox.x + ((e.clientX - rect.left) / rect.width) * viewBox.width;
      const clickSvgZ = viewBox.y + ((e.clientY - rect.top) / rect.height) * viewBox.height;

      let newZ = Math.round(clickSvgZ - dragOffset.z);
      let newX = Math.round(clickSvgX - dragOffset.x);
      let snapGuide: { x1: number; y1: number; x2: number; y2: number } | null = null;
      const SNAP_THRESH = 8; // cm magnetic snap threshold

      // Magnetic snap along walls
      if (targetMod.wallId === 'right-niche1' || targetMod.wallId === 'right-niche2' || targetMod.wallId === 'right-niche3') {
        newX = 0; // Lock to right wall
        // Collect magnetic snap targets
        const snapTargets: number[] = [
          0,
          263 - targetMod.dimensions.width,
          288,
          556 - targetMod.dimensions.width,
          581,
          705 - targetMod.dimensions.width
        ];
        // Snap to adjacent cabinets
        modules.forEach(m => {
          if (m.id !== targetMod.id && (m.wallId === 'right-niche1' || m.wallId === 'right-niche2' || m.wallId === 'right-niche3')) {
            snapTargets.push(m.position[2] + m.dimensions.width);
            snapTargets.push(m.position[2] - targetMod.dimensions.width);
          }
        });

        for (const tZ of snapTargets) {
          if (Math.abs(newZ - tZ) <= SNAP_THRESH) {
            newZ = tZ;
            snapGuide = { x1: 0, y1: tZ, x2: 120, y2: tZ };
            break;
          }
        }
        newZ = Math.max(0, Math.min(newZ, 705 - targetMod.dimensions.width));

      } else if (targetMod.wallId === 'back-wall') {
        newZ = 705 - targetMod.dimensions.depth; // Lock to back wall
        const snapTargets: number[] = [
          0,
          38,
          65,
          197,
          257,
          317 - targetMod.dimensions.width
        ];
        modules.forEach(m => {
          if (m.id !== targetMod.id && m.wallId === 'back-wall') {
            snapTargets.push(m.position[0] + m.dimensions.width);
            snapTargets.push(m.position[0] - targetMod.dimensions.width);
          }
        });

        for (const tX of snapTargets) {
          if (Math.abs(newX - tX) <= SNAP_THRESH) {
            newX = tX;
            snapGuide = { x1: tX, y1: 580, x2: tX, y2: 705 };
            break;
          }
        }
        newX = Math.max(0, Math.min(newX, 317 - targetMod.dimensions.width));

      } else if (targetMod.wallId === 'left-wall') {
        newX = 317 - targetMod.dimensions.depth; // Lock to left wall
        const snapTargets: number[] = [
          465,
          545,
          705 - targetMod.dimensions.width
        ];
        modules.forEach(m => {
          if (m.id !== targetMod.id && m.wallId === 'left-wall') {
            snapTargets.push(m.position[2] + m.dimensions.width);
            snapTargets.push(m.position[2] - targetMod.dimensions.width);
          }
        });

        for (const tZ of snapTargets) {
          if (Math.abs(newZ - tZ) <= SNAP_THRESH) {
            newZ = tZ;
            snapGuide = { x1: 180, y1: tZ, x2: 317, y2: tZ };
            break;
          }
        }
        newZ = Math.max(0, Math.min(newZ, 705 - targetMod.dimensions.width));
      }

      setActiveSnapGuide(snapGuide);
      updateModule(draggingModuleId, {
        position: [newX, targetMod.position[1], newZ]
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = null;
      pinchStartViewBoxRef.current = null;
    }
    setIsPanning(false);
    setDraggingModuleId(null);
    setActiveSnapGuide(null);
  };

  // Start dragging cabinet (touch or mouse)
  const handleModulePointerDown = (e: React.PointerEvent, mod: PlacedModule) => {
    e.stopPropagation();
    selectModule(mod.id);
    setDraggingModuleId(mod.id);

    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clickSvgX = viewBox.x + ((e.clientX - rect.left) / rect.width) * viewBox.width;
    const clickSvgZ = viewBox.y + ((e.clientY - rect.top) / rect.height) * viewBox.height;

    setDragOffset({
      x: clickSvgX - mod.position[0],
      z: clickSvgZ - mod.position[2]
    });
  };

  // Color mapper
  const getKosherColor = (zone: PlacedModule['kosherZone'], isAppliance?: boolean) => {
    if (!showKosherColors) {
      return isAppliance ? '#4a5568' : '#e2e8f0';
    }
    switch (zone) {
      case 'meat':
        return '#f87171'; // Red / Coral
      case 'dairy':
        return '#60a5fa'; // Blue
      case 'pareve':
        return '#4ade80'; // Green
      case 'neutral':
      default:
        return '#cbd5e1'; // Neutral Slate
    }
  };

  // Export CAD to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(18);
    doc.text(`Liani Kitchen Studio - Plan ${activePlan.toUpperCase()}`, 20, 20);
    doc.setFontSize(11);
    doc.text(`Dimensions: 317 cm x 705 cm | Height: 246 cm (Zero Ceiling Dead Space)`, 20, 28);
    doc.text(`Niches: Niche 1 (263 cm), Niche 2 (268 cm), Niche 3 (124 cm), Pillars 25x89 cm`, 20, 35);
    doc.text(`Generated: ${new Date().toLocaleDateString('he-IL')}`, 20, 42);

    // Summary of modules
    let yPos = 55;
    doc.setFontSize(10);
    doc.text(`Modules count: ${modules.length}`, 20, yPos);
    yPos += 8;

    modules.slice(0, 22).forEach((m, idx) => {
      const line = `${idx + 1}. [${m.sku}] ${m.nameHe} (${m.dimensions.width}x${m.dimensions.depth}x${m.dimensions.height} cm)`;
      doc.text(line, 20, yPos);
      yPos += 7;
    });

    doc.save(`Liani-Kitchen-Blueprint-${activePlan}.pdf`);
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden flex flex-col select-none">
      {/* 2D CAD Toolbar */}
      {!isMiniView && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 text-white shadow-xl">
          <button
            onClick={() => handleZoom(0.8)}
            className="p-1.5 hover:bg-slate-700 rounded text-xs font-semibold px-2"
            title="Zoom In"
          >
            🔍+
          </button>
          <button
            onClick={() => handleZoom(1.25)}
            className="p-1.5 hover:bg-slate-700 rounded text-xs font-semibold px-2"
            title="Zoom Out"
          >
            🔍-
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 hover:bg-slate-700 rounded text-xs font-semibold px-2"
            title="Fit to Screen"
          >
            ⤢ איפוס
          </button>
          <div className="h-4 w-[1px] bg-slate-600 mx-1" />
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors"
          >
            📄 ייצוא PDF
          </button>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'none' }}
        className="w-full h-full cursor-crosshair touch-none"
      >
        <defs>
          {/* Floor grid pattern */}
          <pattern id="cadGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          </pattern>
          {/* Kosher hatching */}
          <pattern id="meatHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="1.5" />
          </pattern>
          <pattern id="dairyHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#3b82f6" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect x="-100" y="-100" width="600" height="1000" fill="#0f172a" />
        <rect x="0" y="0" width={ROOM_SPEC.widthCm} height={ROOM_SPEC.depthCm} fill="url(#cadGrid)" />

        {/* Active Dynamic Snap Guide */}
        {activeSnapGuide && (
          <g pointerEvents="none">
            <line
              x1={activeSnapGuide.x1}
              y1={activeSnapGuide.y1}
              x2={activeSnapGuide.x2}
              y2={activeSnapGuide.y2}
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <circle cx={activeSnapGuide.x1} cy={activeSnapGuide.y1} r="3.5" fill="#38bdf8" />
            <circle cx={activeSnapGuide.x2} cy={activeSnapGuide.y2} r="3.5" fill="#38bdf8" />
          </g>
        )}

        {/* ================= ROOM ARCHITECTURAL WALLS & PILLARS ================= */}
        {/* Floor boundary outline */}
        <rect
          x="0"
          y="0"
          width={ROOM_SPEC.widthCm}
          height={ROOM_SPEC.depthCm}
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Back Wall (317 cm x 12 cm, Solid, no windows) */}
        <rect
          x="0"
          y={ROOM_SPEC.depthCm}
          width={ROOM_SPEC.widthCm}
          height="14"
          fill="#334155"
          stroke="#64748b"
          strokeWidth="1.5"
        />
        <text
          x={ROOM_SPEC.widthCm / 2}
          y={ROOM_SPEC.depthCm + 11}
          fill="#cbd5e1"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
        >
          קיר אחורי חלבי: 317 ס"מ (אטום - ללא חלון)
        </text>

        {/* Left Wall (12 cm x 705 cm) */}
        <rect
          x={ROOM_SPEC.widthCm}
          y="0"
          width="14"
          height={ROOM_SPEC.depthCm}
          fill="#334155"
          stroke="#64748b"
          strokeWidth="1.5"
        />

        {/* Active 240 cm zone line indicator on left wall */}
        <line
          x1={ROOM_SPEC.widthCm}
          y1={465}
          x2={ROOM_SPEC.widthCm - 30}
          y2={465}
          stroke="#eab308"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x={ROOM_SPEC.widthCm - 4}
          y={585}
          fill="#fef08a"
          fontSize="8"
          transform={`rotate(-90 ${ROOM_SPEC.widthCm - 4} 585)`}
          textAnchor="middle"
        >
          גזרת נגרות מאושרת: 240 ס"מ (חלון מנוטרל)
        </text>

        <text
          x={ROOM_SPEC.widthCm - 4}
          y={230}
          fill="#38bdf8"
          fontSize="8"
          transform={`rotate(-90 ${ROOM_SPEC.widthCm - 4} 230)`}
          textAnchor="middle"
        >
          מרחב שולחן אוכל ושבת פתוח ({'>'}2.80 מ')
        </text>

        {/* Right Wall Concrete Pillars (89 cm protrusion x 25 cm width) */}
        {ROOM_SPEC.pillars.map(p => (
          <g key={p.id}>
            <rect
              x="0"
              y={p.z}
              width={p.width}
              height={p.depth}
              fill="#475569"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Concrete cross hatch */}
            <line x1="0" y1={p.z} x2={p.width} y2={p.z + p.depth} stroke="#64748b" strokeWidth="1" />
            <line x1="0" y1={p.z + p.depth} x2={p.width} y2={p.z} stroke="#64748b" strokeWidth="1" />
            <text
              x={p.width / 2}
              y={p.z + 16}
              fill="#ffffff"
              fontSize="8"
              fontWeight="bold"
              textAnchor="middle"
            >
              עמוד 89×25
            </text>
          </g>
        ))}

        {/* Entrance Return Wall (44 cm) */}
        <rect
          x="0"
          y="-14"
          width={ROOM_SPEC.entranceReturnWallCm}
          height="14"
          fill="#334155"
          stroke="#64748b"
          strokeWidth="1.5"
        />
        <text
          x={ROOM_SPEC.entranceReturnWallCm / 2}
          y="-4"
          fill="#94a3b8"
          fontSize="7"
          textAnchor="middle"
        >
          קיר 44
        </text>

        {/* ================= NICHE DIMENSION CHAINS ================= */}
        {showDimensions && (
          <g className="dimension-ribbons" fontSize="8" fill="#94a3b8">
            {/* Niche 1: 263 cm */}
            <line x1="-25" y1="0" x2="-25" y2="263" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="-30" y1="0" x2="-20" y2="0" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="-30" y1="263" x2="-20" y2="263" stroke="#22c55e" strokeWidth="1.5" />
            <text x="-32" y="131" fill="#4ade80" transform="rotate(-90 -32 131)" textAnchor="middle" fontWeight="bold">
              נישה 1: 263 ס"מ (עומק 89)
            </text>

            {/* Pillar 1: 25 cm */}
            <line x1="-25" y1="263" x2="-25" y2="288" stroke="#f97316" strokeWidth="1.5" />
            <text x="-32" y="275" fill="#fb923c" transform="rotate(-90 -32 275)" textAnchor="middle">
              25
            </text>

            {/* Niche 2: 268 cm */}
            <line x1="-25" y1="288" x2="-25" y2="556" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="-30" y1="288" x2="-20" y2="288" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="-30" y1="556" x2="-20" y2="556" stroke="#ef4444" strokeWidth="1.5" />
            <text x="-32" y="422" fill="#f87171" transform="rotate(-90 -32 422)" textAnchor="middle" fontWeight="bold">
              נישה 2 בשרי: 268 ס"מ (עומק 89)
            </text>

            {/* Pillar 2: 25 cm */}
            <line x1="-25" y1="556" x2="-25" y2="581" stroke="#f97316" strokeWidth="1.5" />
            <text x="-32" y="568" fill="#fb923c" transform="rotate(-90 -32 568)" textAnchor="middle">
              25
            </text>

            {/* Niche 3: 124 cm */}
            <line x1="-25" y1="581" x2="-25" y2="705" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="-30" y1="581" x2="-20" y2="581" stroke="#22c55e" strokeWidth="1.5" />
            <line x1="-30" y1="705" x2="-20" y2="705" stroke="#22c55e" strokeWidth="1.5" />
            <text x="-32" y="643" fill="#4ade80" transform="rotate(-90 -32 643)" textAnchor="middle" fontWeight="bold">
              נישה 3: 124 ס"מ (עומק 89)
            </text>

            {/* Back Wall: 317 cm */}
            <line x1="0" y1="730" x2={ROOM_SPEC.widthCm} y2="730" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="0" y1="725" x2="0" y2="735" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1={ROOM_SPEC.widthCm} y1="725" x2={ROOM_SPEC.widthCm} y2="735" stroke="#38bdf8" strokeWidth="1.5" />
            <text x={ROOM_SPEC.widthCm / 2} y="742" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
              רוחב מטבח: 317 ס"מ
            </text>

            {/* Total Right Wall: 705 cm */}
            <line x1="-55" y1="0" x2="-55" y2="705" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
            <text x="-62" y="352" fill="#e2e8f0" transform="rotate(-90 -62 352)" textAnchor="middle">
              אורך כולל ימין: 705 ס"מ
            </text>

            {/* Central Aisle Width Guide Line */}
            <line x1="89" y1="420" x2="257" y2="420" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="173" y="415" fill="#facc15" textAnchor="middle" fontSize="8" fontWeight="bold">
              מעבר מרכזי נטו: 168 ס"מ
            </text>
          </g>
        )}

        {/* ================= PLACED MODULES 2D RENDERING ================= */}
        {modules.map(mod => {
          const isSelected = mod.id === selectedModuleId;
          const { width, depth, height } = mod.dimensions;

          const isCabinetCollision = validationIssues.some(
            iss => iss.code === 'COLLISION' && iss.relatedModuleIds?.includes(mod.id)
          );
          const isDoorBlocked = validationIssues.some(
            iss => iss.code === 'DOOR_SWING_BLOCKED' && iss.relatedModuleIds?.includes(mod.id)
          );

          // Rotation orientation
          // rotation 0: width along X, depth along Z
          // rotation 90: width along Z, depth along X
          // rotation 270: width along Z, depth along X (from right to left)
          const isRotated = mod.rotation === 90 || mod.rotation === 270;
          const rectW = isRotated ? depth : width;
          const rectH = isRotated ? width : depth;

          const fillColor = getKosherColor(mod.kosherZone, mod.isAppliance);

          // Door swing radius arc
          const swingRadius = isRotated ? depth * 0.9 : width * 0.9;

          return (
            <g
              key={mod.id}
              onPointerDown={(e) => handleModulePointerDown(e, mod)}
              className="cursor-move group"
            >
              {/* Cabinet Box */}
              <rect
                x={mod.position[0]}
                y={mod.position[2]}
                width={rectW}
                height={rectH}
                fill={isSelected ? '#38bdf8' : isCabinetCollision ? '#fca5a5' : fillColor}
                stroke={isSelected ? '#ffffff' : isCabinetCollision ? '#ef4444' : '#1e293b'}
                strokeWidth={isSelected || isCabinetCollision ? '2.5' : '1'}
                strokeDasharray={isCabinetCollision ? '4 2' : undefined}
                rx="1"
                className="transition-colors"
              />

              {/* Door Swing & Kinetic Clearance Sweeps */}
              {mod.doorType !== 'none' && (
                <g pointerEvents="none">
                  {/* Right Wall (rotation === 90, doors open towards +X into room) */}
                  {mod.rotation === 90 && (
                    <>
                      {mod.doorType === 'drawers' ? (
                        <rect
                          x={mod.position[0] + depth}
                          y={mod.position[2] + 2}
                          width={38}
                          height={Math.max(4, width - 4)}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      ) : mod.doorType === 'double-door' ? (
                        <>
                          <path
                            d={`M ${mod.position[0] + depth} ${mod.position[2] + width / 2} A ${width / 2} ${width / 2} 0 0 0 ${mod.position[0] + depth + width / 2} ${mod.position[2]}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                          <path
                            d={`M ${mod.position[0] + depth} ${mod.position[2] + width / 2} A ${width / 2} ${width / 2} 0 0 1 ${mod.position[0] + depth + width / 2} ${mod.position[2] + width}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                        </>
                      ) : (
                        <path
                          d={`M ${mod.position[0] + depth} ${mod.position[2]} A ${swingRadius} ${swingRadius} 0 0 1 ${mod.position[0] + depth + swingRadius} ${mod.position[2] + width}`}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      )}
                    </>
                  )}

                  {/* Back Wall (rotation === 0, doors open towards -Z into room) */}
                  {mod.rotation === 0 && (
                    <>
                      {mod.doorType === 'drawers' ? (
                        <rect
                          x={mod.position[0] + 2}
                          y={mod.position[2] - 38}
                          width={Math.max(4, width - 4)}
                          height={38}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      ) : mod.doorType === 'double-door' ? (
                        <>
                          <path
                            d={`M ${mod.position[0] + width / 2} ${mod.position[2]} A ${width / 2} ${width / 2} 0 0 0 ${mod.position[0]} ${mod.position[2] - width / 2}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                          <path
                            d={`M ${mod.position[0] + width / 2} ${mod.position[2]} A ${width / 2} ${width / 2} 0 0 1 ${mod.position[0] + width} ${mod.position[2] - width / 2}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                        </>
                      ) : (
                        <path
                          d={`M ${mod.position[0] + width} ${mod.position[2]} A ${swingRadius} ${swingRadius} 0 0 0 ${mod.position[0]} ${mod.position[2] - swingRadius}`}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      )}
                    </>
                  )}

                  {/* Left Wall (rotation === 270, doors open towards -X into room) */}
                  {mod.rotation === 270 && (
                    <>
                      {mod.doorType === 'drawers' ? (
                        <rect
                          x={mod.position[0] - 38}
                          y={mod.position[2] + 2}
                          width={38}
                          height={Math.max(4, width - 4)}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      ) : mod.doorType === 'double-door' ? (
                        <>
                          <path
                            d={`M ${mod.position[0]} ${mod.position[2] + width / 2} A ${width / 2} ${width / 2} 0 0 0 ${mod.position[0] - width / 2} ${mod.position[2]}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                          <path
                            d={`M ${mod.position[0]} ${mod.position[2] + width / 2} A ${width / 2} ${width / 2} 0 0 1 ${mod.position[0] - width / 2} ${mod.position[2] + width}`}
                            fill="none"
                            stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                            strokeWidth={isDoorBlocked ? 2 : 1}
                            strokeDasharray="2 2"
                            opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                          />
                        </>
                      ) : (
                        <path
                          d={`M ${mod.position[0]} ${mod.position[2] + width} A ${swingRadius} ${swingRadius} 0 0 1 ${mod.position[0] - swingRadius} ${mod.position[2]}`}
                          fill="none"
                          stroke={isDoorBlocked ? '#ef4444' : '#fb923c'}
                          strokeWidth={isDoorBlocked ? 2 : 1}
                          strokeDasharray="2 2"
                          opacity={mod.openPercent > 0.05 ? 1 : 0.45}
                        />
                      )}
                    </>
                  )}

                  {/* Red Blocked Sweep Indicator */}
                  {isDoorBlocked && (
                    <g>
                      <rect
                        x={mod.position[0] + (mod.rotation === 90 ? depth + 4 : mod.rotation === 270 ? -48 : 4)}
                        y={mod.position[2] + 4}
                        width={44}
                        height={13}
                        rx={3}
                        fill="#ef4444"
                      />
                      <text
                        x={mod.position[0] + (mod.rotation === 90 ? depth + 26 : mod.rotation === 270 ? -26 : 26)}
                        y={mod.position[2] + 13}
                        fill="#ffffff"
                        fontSize="6.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ⚠️ חסום!
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* Cutout symbols for Sinks and Cooktops */}
              {mod.applianceType === 'sink' && (
                <rect
                  x={mod.position[0] + rectW * 0.15}
                  y={mod.position[2] + rectH * 0.15}
                  width={rectW * 0.7}
                  height={rectH * 0.7}
                  fill="#0284c7"
                  rx="2"
                  opacity="0.8"
                />
              )}

              {mod.applianceType === 'cooktop' && (
                <g>
                  <circle cx={mod.position[0] + rectW * 0.3} cy={mod.position[2] + rectH * 0.5} r={rectW * 0.15} fill="#dc2626" opacity="0.85" />
                  <circle cx={mod.position[0] + rectW * 0.7} cy={mod.position[2] + rectH * 0.5} r={rectW * 0.15} fill="#dc2626" opacity="0.85" />
                </g>
              )}

              {/* Module Text Label */}
              <text
                x={mod.position[0] + rectW / 2}
                y={mod.position[2] + rectH / 2 + 3}
                fill="#0f172a"
                fontSize={rectW < 50 || rectH < 50 ? '7' : '8'}
                fontWeight="bold"
                textAnchor="middle"
                pointerEvents="none"
              >
                {width}cm
              </text>

              <text
                x={mod.position[0] + rectW / 2}
                y={mod.position[2] + rectH / 2 - 6}
                fill="#1e293b"
                fontSize="6.5"
                textAnchor="middle"
                pointerEvents="none"
              >
                {mod.sku}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend & Help Footer */}
      {!isMiniView && (
        <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-red-400 inline-block" /> בשרי (נישה 2)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-blue-400 inline-block" /> חלבי (קיר אחורי)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-green-400 inline-block" /> פרווה / שבת
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-slate-400 inline-block" /> קירור ואוכל
            </span>
          </div>
          <div className="text-slate-400 text-xs">
            💡 גרור ארון לשינוי מיקום לאורך הקיר | קליק ימני/גרור רקע להזזת המסך
          </div>
        </div>
      )}
    </div>
  );
};
