import React, { useState } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { X, Download, Upload, Copy, Check, FileJson, AlertCircle } from 'lucide-react';

export const ProjectExportModal: React.FC = () => {
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);
  const exportProjectJson = useKitchenStore(state => state.exportProjectJson);
  const importProjectJson = useKitchenStore(state => state.importProjectJson);
  const activePlan = useKitchenStore(state => state.activePlan);

  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (activeDialog !== 'export') return null;

  const currentJson = exportProjectJson();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liani-kitchen-${activePlan}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
        handleExecuteImport(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = (jsonStr: string) => {
    setImportStatus(null);
    const success = importProjectJson(jsonStr);
    if (success) {
      setImportStatus({
        type: 'success',
        message: 'הפרויקט נטען בהצלחה! כל המודולים, החומרים והתאורה עודכנו.'
      });
      setTimeout(() => {
        setActiveDialog('none');
      }, 1200);
    } else {
      setImportStatus({
        type: 'error',
        message: 'שגיאה בקריאת קובץ ה-JSON. ודא שמבנה הנתונים תקין ומכיל מערך placedModules.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ייצוא / ייבוא פרויקט (Project JSON)</h2>
              <p className="text-xs text-slate-400">שמירה מקומית, גיבוי ענן ושיתוף תוכנית המטבח</p>
            </div>
          </div>
          <button
            onClick={() => setActiveDialog('none')}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs">
          {importStatus && (
            <div
              className={`p-3 rounded-lg border flex items-center gap-2 ${
                importStatus.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/60 border-red-500/50 text-red-300'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Export Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">1. שמירה וייצוא קובץ פרויקט</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'הועתק ללוח!' : 'העתק JSON'}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>הורד קובץ .json</span>
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={currentJson}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 focus:outline-none select-all"
            />
          </div>

          <div className="h-px bg-slate-800" />

          {/* Import Section */}
          <div className="space-y-2">
            <span className="font-bold text-sm text-white">2. טעינת פרויקט קיים</span>
            <p className="text-slate-400">
              בחר קובץ JSON מהמחשב או הדבק את תוכן ה-JSON בתיבה להלן כדי לטעון תכנון שמור:
            </p>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
                <Upload className="w-4 h-4 text-sky-400" />
                <span>בחר קובץ .json</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => handleExecuteImport(importText)}
                disabled={!importText.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                טען פרויקט מתיבת הטקסט
              </button>
            </div>
            <textarea
              placeholder="הדבק כאן תוכן קובץ JSON..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={5}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={() => setActiveDialog('none')}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-xs transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
