import React, { useState } from 'react';
import { useKitchenStore } from '../store/useKitchenStore';
import { KITCHEN_CATALOG } from '../data/catalog';
import { CatalogItem } from '../types/kitchen';
import { 
  Plus, 
  Search, 
  Refrigerator, 
  Flame, 
  Droplet, 
  Droplets, 
  Sparkles, 
  Layers, 
  Utensils, 
  CookingPot,
  X
} from 'lucide-react';

export const CatalogDrawer: React.FC = () => {
  const addModule = useKitchenStore(state => state.addModuleFromCatalog);
  const setActiveDialog = useKitchenStore(state => state.setActiveDialog);

  const [activeTab, setActiveTab] = useState<'all' | 'cooling' | 'meat' | 'dairy' | 'tall' | 'wall' | 'dining'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Refrigerator':
      case 'Snowflake':
        return <Refrigerator className="w-5 h-5 text-sky-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Droplet':
      case 'CookingPot':
        return <CookingPot className="w-5 h-5 text-red-400" />;
      case 'Droplets':
      case 'Sparkles':
        return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'Layers':
      case 'ChevronsUp':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Utensils':
      case 'Users':
      default:
        return <Utensils className="w-5 h-5 text-yellow-400" />;
    }
  };

  const filteredItems = KITCHEN_CATALOG.filter(item => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.nameHe.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.descriptionHe.toLowerCase().includes(q);
    }
    if (activeTab === 'cooling') return item.applianceType === 'fridge' || item.applianceType === 'freezer';
    if (activeTab === 'meat') return item.kosherZone === 'meat';
    if (activeTab === 'dairy') return item.kosherZone === 'dairy';
    if (activeTab === 'tall') return item.category === 'tall' || item.sku.includes('GARAGE');
    if (activeTab === 'wall') return item.category === 'wall';
    if (activeTab === 'dining') return item.category === 'furniture';
    return true;
  });

  return (
    <div className="w-full md:w-96 h-full bg-slate-900 border-r border-slate-800 text-white flex flex-col z-20 shadow-2xl select-none">
      {/* Drawer Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm">קטלוג מודולים ומכשירים</h3>
          <p className="text-[11px] text-slate-400">הוסף מודולים מותאמים אישית לנישות ולקירות</p>
        </div>
        <button
          onClick={() => setActiveDialog('none')}
          className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-2.5 border-b border-slate-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חיפוש מודול (למשל: מקפיא, תנור, כיור...)"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="p-2 border-b border-slate-800 flex items-center gap-1 overflow-x-auto text-xs scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'all' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          הכל ({KITCHEN_CATALOG.length})
        </button>
        <button
          onClick={() => setActiveTab('cooling')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'cooling' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          קירור
        </button>
        <button
          onClick={() => setActiveTab('meat')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'meat' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          בשרי
        </button>
        <button
          onClick={() => setActiveTab('dairy')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'dairy' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          חלבי
        </button>
        <button
          onClick={() => setActiveTab('tall')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'tall' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          גבוהים/אפייה
        </button>
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'wall' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          פסח/עליונים
        </button>
        <button
          onClick={() => setActiveTab('dining')}
          className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
            activeTab === 'dining' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          פינת אוכל
        </button>
      </div>

      {/* Catalog List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredItems.map(item => (
          <div
            key={item.sku}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-lg p-2.5 transition-all flex flex-col gap-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-900 rounded-md">
                  {renderIcon(item.iconName)}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">{item.nameHe}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">[{item.sku}]</span>
                </div>
              </div>

              <button
                onClick={() => addModule(item)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition-colors shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>הוסף</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">{item.descriptionHe}</p>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/50">
              <span className="font-mono">
                {item.defaultDimensions.width}×{item.defaultDimensions.depth}×{item.defaultDimensions.height} ס"מ
              </span>
              <span className="font-bold text-amber-400">
                {item.priceIls.toLocaleString()} ₪
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
