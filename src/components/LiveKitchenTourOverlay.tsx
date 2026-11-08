import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Compass, 
  Gauge, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  RotateCw,
  Navigation,
  Info
} from 'lucide-react';
import { useKitchenStore } from '../store/useKitchenStore';
import { TOUR_STATIONS } from '../data/tourStations';

interface LiveKitchenTourOverlayProps {
  onDriveStep: (dir: 'forward' | 'backward' | 'left' | 'right' | 'turn-left' | 'turn-right') => void;
}

export const LiveKitchenTourOverlay: React.FC<LiveKitchenTourOverlayProps> = ({ onDriveStep }) => {
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

  const [showDrivePad, setShowDrivePad] = useState(true);

  const currentStation = TOUR_STATIONS[activeStationIndex] || TOUR_STATIONS[0];

  // Global Keyboard Navigation Listener (WASD and Arrow keys)
  useEffect(() => {
    if (!isLiveTourActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          onDriveStep('forward');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          onDriveStep('backward');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          onDriveStep('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          onDriveStep('right');
          break;
        case 'q':
        case 'Q':
          e.preventDefault();
          onDriveStep('turn-left');
          break;
        case 'e':
        case 'E':
          e.preventDefault();
          onDriveStep('turn-right');
          break;
        case ' ':
          e.preventDefault();
          toggleTourPlay();
          break;
        case 'Escape':
          stopLiveTour();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLiveTourActive, onDriveStep, toggleTourPlay, stopLiveTour]);

  if (!isLiveTourActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between p-3 sm:p-5">
      {/* Top Floating Station HUD */}
      <div className="pointer-events-auto max-w-2xl mx-auto w-full">
        <div className="bg-slate-950/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    תחנה {currentStation.stationNumber} מתוך {TOUR_STATIONS.length}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300">
                    {currentStation.badgeHe}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
                  {currentStation.nameHe}
                </h3>
              </div>
            </div>

            <button
              onClick={stopLiveTour}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="סיום סיור וחזרה לתלת-ממד חופשי"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {currentStation.descriptionHe}
          </p>

          {/* Quick Station Navigation Pills */}
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 overflow-x-auto no-scrollbar pb-0.5">
            {TOUR_STATIONS.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setStationIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeStationIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {st.stationNumber}. {st.nameHe.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Driving / Free-Walk Touch Pad (Floats on Left or Right) */}
      <div className="flex items-end justify-between w-full pointer-events-none">
        {/* Drive Controller (Virtual D-Pad for Touch/Mouse) */}
        <div className="pointer-events-auto bg-slate-950/85 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-1 px-1">
            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              נהיגה חופשית
            </span>
            <button
              onClick={() => setShowDrivePad(!showDrivePad)}
              className="text-[10px] text-slate-400 hover:text-white px-1"
            >
              {showDrivePad ? 'הסתר' : 'הצג'}
            </button>
          </div>

          {showDrivePad && (
            <div className="space-y-1 mt-1">
              {/* Row 1: Forward */}
              <div className="flex justify-center">
                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('forward'); }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 active:scale-95 text-white flex items-center justify-center transition-all border border-slate-700 shadow"
                  title="נסיעה קדימה (חץ עליון / W)"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>

              {/* Row 2: Left, Turn Left, Turn Right, Right */}
              <div className="flex items-center gap-1">
                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('left'); }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 active:scale-95 text-white flex items-center justify-center transition-all border border-slate-700 shadow"
                  title="תנועה שמאלה (חץ שמאלי / A)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('turn-left'); }}
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-400 flex items-center justify-center transition-all border border-slate-800 text-[10px] font-bold"
                  title="סיבוב מבט שמאלה (Q)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('turn-right'); }}
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-400 flex items-center justify-center transition-all border border-slate-800 text-[10px] font-bold"
                  title="סיבוב מבט ימינה (E)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('right'); }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 active:scale-95 text-white flex items-center justify-center transition-all border border-slate-700 shadow"
                  title="תנועה ימינה (חץ ימני / D)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Row 3: Backward */}
              <div className="flex justify-center">
                <button
                  onPointerDown={(e) => { e.preventDefault(); onDriveStep('backward'); }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 active:scale-95 text-white flex items-center justify-center transition-all border border-slate-700 shadow"
                  title="נסיעה אחורה (חץ תחתון / S)"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Playback Bar */}
        <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-full px-4 py-2 shadow-2xl flex items-center gap-3 text-white mx-auto">
          {/* Previous Station */}
          <button
            onClick={prevStation}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
            title="תחנה קודמת"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Autopilot */}
          <button
            onClick={toggleTourPlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${
              isTourPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
            }`}
            title={isTourPlaying ? 'השהה סיור אוטומטי' : 'המשך סיור אוטומטי'}
          >
            {isTourPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {/* Next Station */}
          <button
            onClick={nextStation}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
            title="תחנה הבאה"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800" />

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const speeds = [0.5, 1, 1.5];
              const nextIdx = (speeds.indexOf(tourSpeed) + 1) % speeds.length;
              setTourSpeed(speeds[nextIdx]);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-amber-300 hover:bg-slate-800 transition-colors font-mono"
            title="שינוי מהירות נסיעה"
          >
            <Gauge className="w-3 h-3 text-amber-400" />
            <span>{tourSpeed}x</span>
          </button>

          <div className="w-px h-5 bg-slate-800 hidden sm:block" />

          {/* Desktop Keyboard Tip */}
          <span className="text-[10px] text-slate-400 hidden md:inline-block">
            ניווט: מקשי חצים / WASD | סיבוב 360° בעכבר
          </span>
        </div>
      </div>
    </div>
  );
};
