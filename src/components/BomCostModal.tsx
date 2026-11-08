import React from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { X, Download, Printer, Calculator } from 'lucide-react';

export const BomCostModal: React.FC = () => {
  const activeDialog = useKitchenStore(state => state.activeDialog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);
  const bomSummary = useKitchenStore(state => state.bomSummary);
  const activePlan = useKitchenStore(state => state.activePlan);

  if (activeDialog !== 'bom') return null;

  // Export BOM to CSV
  const handleExportCSV = () => {
    let csv = '\uFEFF'; // BOM for UTF-8 in Excel
    csv += 'מק"ט,שם פריט,אגף,מידות (רXעXג ס"מ),כמות,מחיר יחידה (₪),סה"כ (₪)\n';

    bomSummary.items.forEach(item => {
      const kosherZoneHe = item.kosherZone === 'meat' ? 'בשרי' : item.kosherZone === 'dairy' ? 'חלבי' : 'פרווה/כללי';
      csv += `"${item.sku}","${item.nameHe}","${kosherZoneHe}","${item.widthCm}x${item.depthCm}x${item.heightCm}",${item.count},${item.unitPriceIls},${item.totalPriceIls}\n`;
    });

    csv += `\nמשטח שיש וגרניט פורצלן,,,${bomSummary.countertopSqm} מ"ר,1,1650,${bomSummary.countertopPriceIls}\n`;
    csv += `סה"כ נגרות ושיש,,,,,,${bomSummary.carpentryTotalIls + bomSummary.countertopPriceIls}\n`;
    csv += `סה"כ מוצרי חשמל,,,,,,${bomSummary.appliancesTotalIls}\n`;
    csv += `סה"כ משוער לפרויקט,,,,,,${bomSummary.grandTotalIls}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BOM-Kitchen-Liani-${activePlan}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 select-none">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col text-white overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-sm md:text-base">כתב כמויות הנדסי ואומדן עלויות (BOM)</h2>
              <p className="text-xs text-slate-400">
                תוכנית {activePlan.toUpperCase()} | גובה 246 ס"מ מלא לתקרה | מעטפת 317×705
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>ייצוא ל-Excel (CSV)</span>
            </button>
            <button
              onClick={() => setActiveDialog('none')}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[11px]">סה"כ נגרות וארונות:</span>
              <span className="text-base font-bold text-white font-mono">
                {bomSummary.carpentryTotalIls.toLocaleString()} ₪
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[11px]">שיש ({bomSummary.countertopSqm} מ"ר):</span>
              <span className="text-base font-bold text-sky-400 font-mono">
                {bomSummary.countertopPriceIls.toLocaleString()} ₪
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[11px]">מוצרי חשמל וקירור:</span>
              <span className="text-base font-bold text-amber-400 font-mono">
                {bomSummary.appliancesTotalIls.toLocaleString()} ₪
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 rounded-lg border border-blue-600">
              <span className="text-blue-200 block text-[11px]">סה"כ אומדן פרויקט:</span>
              <span className="text-lg font-black text-white font-mono">
                {bomSummary.grandTotalIls.toLocaleString()} ₪
              </span>
            </div>
          </div>

          {/* Hardware & Fittings Breakdown */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-slate-300">
            <h4 className="font-semibold text-xs text-white mb-2">פירוט פרזול ומנגנונים מתקדמים (Blum):</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
              <div>• קלפות כפולות Aventos HF/HK: <strong className="text-white">{bomSummary.hardwareSummary.aventosLiftsCount} יח'</strong></div>
              <div>• מגירות עומס כבד Legrabox: <strong className="text-white">{bomSummary.hardwareSummary.legraboxDrawersCount} יח'</strong></div>
              <div>• דלתות צירים שקטים: <strong className="text-white">{bomSummary.hardwareSummary.hingedDoorsCount} יח'</strong></div>
              <div>• דלתות כיס Pocket Doors: <strong className="text-white">{bomSummary.hardwareSummary.pocketDoorsCount} יח'</strong></div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-2.5">מק"ט</th>
                  <th className="p-2.5">תיאור הפריט</th>
                  <th className="p-2.5">אגף</th>
                  <th className="p-2.5">מידות (ר×ע×ג ס"מ)</th>
                  <th className="p-2.5 text-center">כמות</th>
                  <th className="p-2.5">מחיר יחידה</th>
                  <th className="p-2.5">סה"כ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bomSummary.items.map(item => (
                  <tr key={item.sku} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono text-slate-400">{item.sku}</td>
                    <td className="p-2.5 font-medium text-white">{item.nameHe}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.kosherZone === 'meat' ? 'bg-red-900/60 text-red-300' :
                        item.kosherZone === 'dairy' ? 'bg-blue-900/60 text-blue-300' :
                        item.kosherZone === 'pareve' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {item.kosherZone === 'meat' ? 'בשרי' : item.kosherZone === 'dairy' ? 'חלבי' : 'פרווה/כללי'}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-slate-300">
                      {item.widthCm}×{item.depthCm}×{item.heightCm}
                    </td>
                    <td className="p-2.5 text-center font-bold text-white">{item.count}</td>
                    <td className="p-2.5 font-mono text-slate-300">{item.unitPriceIls.toLocaleString()} ₪</td>
                    <td className="p-2.5 font-mono font-bold text-amber-400">{item.totalPriceIls.toLocaleString()} ₪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
