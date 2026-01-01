import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';
import TwelveAyatana from './components/TwelveAyatana';
import DuyenKhoiCircle from './components/DuyenKhoiCircle';

const DhammaVisualizerV2 = () => {
  const [activeMenu, setActiveMenu] = useState('12xu');
  const [duyenDirection, setDuyenDirection] = useState('forward');
  const [mindfulnessActive, setMindfulnessActive] = useState(false);

  useEffect(() => {
    const savedMenu = localStorage.getItem('dhamma-active-menu');
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('dhamma-active-menu', menu);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .resize-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 6px;
          cursor: col-resize;
          background: transparent;
          z-index: 10;
          transition: background-color 0.2s;
        }
        .resize-handle:hover,
        .resize-handle.active {
          background: rgba(59, 130, 246, 0.2);
        }
        .resize-handle::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3px;
          height: 60px;
          background: #3b82f6;
          border-radius: 3px;
          opacity: 0;
          transition: opacity 0.2s;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
        }
        .resize-handle:hover::after,
        .resize-handle.active::after {
          opacity: 1;
        }
      `}</style>

      {/* Header with Main Menu Toggle */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-none shadow-sm z-10">
        <div className="flex flex-col gap-4 max-w-full mx-auto">
          {/* Main Menu Toggle */}
          <div className="flex justify-center">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-1.5 rounded-xl border-2 border-blue-200 shadow-sm">
              <button
                onClick={() => handleMenuChange('12xu')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  activeMenu === '12xu' 
                    ? 'bg-white text-blue-700 shadow-md ring-2 ring-blue-300' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <Layers size={18} />
                <span>12 Xứ (Āyatana)</span>
              </button>
              <button
                onClick={() => handleMenuChange('12duyen')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  activeMenu === '12duyen' 
                    ? 'bg-white text-indigo-700 shadow-md ring-2 ring-indigo-300' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <RotateCcw size={18} />
                <span>12 Duyên Khởi (Paṭicca-samuppāda)</span>
              </button>
            </div>
          </div>

          {/* Controls based on active menu */}
          {activeMenu === '12xu' && <TwelveAyatana />}

          {activeMenu === '12duyen' && (
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-center">
           

              <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2.5 rounded-lg border-2 border-emerald-200">
                <Lightbulb size={18} className="text-emerald-600" />
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={mindfulnessActive}
                    onChange={(e) => setMindfulnessActive(e.target.checked)}
                    className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-emerald-800">
                    Thiết lập Chánh Niệm (Cắt đứt vòng luân hồi)
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      {activeMenu === '12duyen' && (
        <div className="flex-1 overflow-y-auto hide-scrollbar bg-slate-50 w-full">
          <div className="w-full h-full p-4 pt-0">
            <DuyenKhoiCircle 
              duyenDirection={duyenDirection}
              mindfulnessActive={mindfulnessActive}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DhammaVisualizerV2;