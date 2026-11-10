import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Compass, 
  Eye, 
  Gauge,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useKitchenStore } from '../store/useKitchenStore';
import { TOUR_STATIONS } from '../data/tourStations';

export const LiveKitchenTourOverlay: React.FC = () => {
  const isLiveTourActive = useKitchenStore(state => state.isLiveTourActive);
  const stopLiveTour = useKitchenStore(state => state.stopLiveTour);
  const activeStationIndex = useKitchenStore(state => state.activeStationIndex);
  const setStationIndex = useKitchenStore(state => state.setStationIndex);
  const isTourPlaying = useKitchenStore(state => state.isTourPlaying);
  const toggleTourPlay = useKitchenStore(state => state.toggleTourPlay);
  const tourSpeed = useKitchenStore(state => state.tourSpeed);
  const setTourSpeed = useKitchenStore(state => state.setTourSpeed);
  const nextStation = useKitchenStore(state => state.nextStation);
  const prevStation = useKitchenStore(state => state.prevStation);

  if (!isLiveTourActive) return null;

  const currentStation = TOUR_STATIONS[activeStationIndex] || TOUR_STATIONS[0];

  const cycleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const next = speeds[(speeds.indexOf(tourSpeed) + 1) % speeds.length];
    setTourSpeed(next);
  };

  return (
    <div 
      dir="rtl"
      className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between p-3 sm:p-6"
    >
      {/* Top Station Cinematic Title Card */}
      <div className="pointer-events-auto max-w-xl mx-auto w-full">
        <div className="bg-slate-950/85 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl text-white transition-all animate-in fade-in slide-in-from-top-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    תחנה {currentStation.stationNumber} מתוך {TOUR_STATIONS.length}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {currentStation.badgeHe}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  {currentStation.nameHe}
                </h3>
              </div>
            </div>
            
            <button
              onClick={stopLiveTour}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="סגירת סיור וחזרה לתלת-ממד"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800/80">
            {currentStation.descriptionHe}
          </p>
        </div>
      </div>

      {/* Mini-Radar Map (Top Left) */}
      <div className="pointer-events-auto absolute top-6 left-6 hidden lg:block">
        <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 shadow-xl w-44 text-right">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 pb-2 border-b border-slate-800 mb-2">
            <span>מפת התמצאות</span>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
          </div>
          {/* Schematic SVG Kitchen Footprint (705x317 cm) */}
          <div className="relative w-full h-28 bg-slate-900/90 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 317 705" className="w-full h-full p-1 opacity-70">
              {/* Outer boundary */}
              <rect x="0" y="0" width="317" height="705" fill="none" stroke="#475569" strokeWidth="6" />
              {/* Pillar 1 & 2 */}
              <rect x="0" y="263" width="89" height="25" fill="#64748b" />
              <rect x="0" y="556" width="89" height="25" fill="#64748b" />
              {/* Back Wall (Y=645..705) */}
              <rect x="0" y="640" width="317" height="65" fill="#334155" />
              {/* Left Wall Tall Units */}
              <rect x="257" y="400" width="60" height="240" fill="#334155" />
            </svg>
            {/* Live Station Position Marker */}
            <div 
              className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 shadow-lg shadow-amber-400/50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                left: `${(currentStation.camPos[0] / 317) * 100}%`,
                top: `${(currentStation.camPos[2] / 705) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Floating Cinematic Control Deck */}
      <div className="pointer-events-auto max-w-2xl mx-auto w-full mb-1 sm:mb-2">
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col gap-3">
          
          {/* Station Stepper Pills */}
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {TOUR_STATIONS.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setStationIndex(idx)}
                className={`flex-1 min-w-[32px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0 ${
                  idx === activeStationIndex
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={st.nameHe}
              >
                <span>{st.stationNumber}</span>
                <span className="hidden sm:inline text-[11px] truncate">{st.badgeHe}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons & Playback Bar */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
            
            <div className="flex items-center gap-2">
              <button
                onClick={prevStation}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="תחנה קודמת"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTourPlay}
                className="px-5 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95 text-xs sm:text-sm"
              >
                {isTourPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>השהה סיור</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>המשך סיור</span>
                  </>
                )}
              </button>

              <button
                onClick={nextStation}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="תחנה הבאה"
              >
                <SkipBack className="w-5 h-5" />
              </button>
            </div>

            {/* Speed & Exit */}
            <div className="flex items-center gap-2">
              <button
                onClick={cycleSpeed}
                className="px-3 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors text-xs font-bold"
                title="מהירות מעבר בין תחנות"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>{tourSpeed}x</span>
              </button>

              <button
                onClick={stopLiveTour}
                className="px-4 h-10 rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-red-300 flex items-center gap-1.5 transition-colors text-xs font-bold"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">יציאה מסיור</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
