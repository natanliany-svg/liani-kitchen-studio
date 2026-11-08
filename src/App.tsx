import React from 'react';
import { useKitchenStore } from './store/useKitchenStore';
import { Header } from './components/Header';
import { NicheStatusHUD } from './components/NicheStatusHUD';
import { ThreeKitchenCanvas } from './components/ThreeKitchenCanvas';
import { CadBlueprintCanvas } from './components/CadBlueprintCanvas';
import { SplitCompareView } from './components/SplitCompareView';
import { CatalogDrawer } from './components/CatalogDrawer';
import { ParametricInspector } from './components/ParametricInspector';
import { PhotorealisticGallery } from './components/PhotorealisticGallery';
import { BomCostModal } from './components/BomCostModal';
import { ReferenceMediaModal } from './components/ReferenceMediaModal';
import { ProjectExportModal } from './components/ProjectExportModal';
import { MobileControlsModal } from './components/MobileControlsModal';
import { MobileNavigation } from './components/MobileNavigation';

export const App: React.FC = () => {
  const viewMode = useKitchenStore(state => state.viewMode);
  const selectedModuleId = useKitchenStore(state => state.selectedModuleId);
  const activeDialog = useKitchenStore(state => state.activeDialog);

  return (
    <div dir="rtl" className="flex flex-col w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-slate-950 font-sans">
      {/* Top Header Navigation */}
      <Header />

      {/* Real-time Niche & Architectural Capacity HUD */}
      <NicheStatusHUD />

      {/* Main Studio Viewport Area */}
      <main className="flex-1 relative flex overflow-hidden">
        {/* Central Canvas Container */}
        <div className="flex-1 relative flex overflow-hidden">
          {viewMode === 'renders' ? (
            <PhotorealisticGallery />
          ) : viewMode === 'compare' ? (
            <SplitCompareView />
          ) : viewMode === '3d' ? (
            <ThreeKitchenCanvas />
          ) : viewMode === '2d' ? (
            <CadBlueprintCanvas />
          ) : (
            // Split View: 3D on right (primary in RTL), 2D on left
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-800">
              <div className="relative w-full h-full">
                <ThreeKitchenCanvas />
              </div>
              <div className="relative w-full h-full">
                <CadBlueprintCanvas />
              </div>
            </div>
          )}
        </div>

        {/* Catalog Drawer (Slides in on request, modal on mobile, sidebar on desktop) */}
        {activeDialog === 'catalog' && (
          <div className="absolute lg:relative inset-y-0 right-0 z-30 w-full sm:w-96 h-full">
            <CatalogDrawer />
          </div>
        )}

        {/* Parametric Inspector (Always accessible on desktop when module selected, or on mobile via toggle) */}
        {selectedModuleId && (
          <div className="hidden lg:block">
            <ParametricInspector />
          </div>
        )}
        {selectedModuleId && activeDialog === 'inspector' && (
          <div className="lg:hidden absolute inset-y-0 left-0 z-30 w-full sm:w-80">
            <ParametricInspector />
          </div>
        )}
      </main>

      {/* Modals & Dialogs */}
      <BomCostModal />
      <ReferenceMediaModal />
      <ProjectExportModal />
      <MobileControlsModal />

      {/* Mobile Bottom Touch Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default App;
