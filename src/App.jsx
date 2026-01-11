import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Lightbulb, Skull, Flower } from 'lucide-react'; 
import TwelveAyatana from './components/TwelveAyatana';
import DuyenKhoiCircle from './components/DuyenKhoiCircle';
import DeathCountdown from './components/DeathCountdown';
import MeditationTimer from './components/MeditationTimer'; 

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

  // Kindle Style Buttons
  const getButtonClass = (isActive) => `
    flex-1 px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest border-r border-black last:border-r-0 transition-all flex items-center justify-center gap-2
    ${isActive 
      ? 'bg-black text-white' 
      : 'bg-white text-black hover:bg-gray-100'}
  `;

  return (
    <div className="flex flex-col h-screen bg-white  text-black overflow-hidden">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header Kindle Style */}
      <div className="bg-white border-b-2 border-black px-0 py-0 flex-none z-10">
        <div className="flex flex-col gap-0 max-w-full mx-auto">
          {/* Main Menu Toggle */}
          <div className="flex justify-center border-b w-full p-3 md:p-4">
            <div className="flex items-center w-full max-w-4xl mx-auto gap-1">
              <button
                
                onClick={() => handleMenuChange('12xu')}
                className={getButtonClass(activeMenu === '12xu')}
              >
                <Layers size={18} />
                <span className="hidden sm:inline">12 Xứ</span>
              </button>
              
              <button
                onClick={() => handleMenuChange('12duyen')}
                className={getButtonClass(activeMenu === '12duyen')}
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">12 Duyên</span>
              </button>
              
             
              
              <button
                onClick={() => handleMenuChange('meditation')}
                className={getButtonClass(activeMenu === 'meditation')}
              >
                <Flower size={18} /> 
                <span className="hidden sm:inline">Thiền</span>
              </button>
            </div>
          </div>

          {/* Controls - Minimalist */}
          {activeMenu === '12xu' && <div className="hidden"></div>}

          {activeMenu === '12duyen' && (
            <div className="flex flex-row gap-3 items-center justify-center py-2 bg-gray-50 border-b border-black">
              <div className="flex items-center gap-2 px-3 py-1 bg-white border border-black rounded-sm">
                <Lightbulb size={16} className="text-black" />
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={mindfulnessActive}
                    onChange={(e) => setMindfulnessActive(e.target.checked)}
                    className="w-4 h-4 text-black border-black focus:ring-0 cursor-pointer rounded-none"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Chánh Niệm
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar bg-white w-full relative">
        {activeMenu === '12xu' && <TwelveAyatana />}
        
        {activeMenu === '12duyen' && (
            <div className="w-full h-full p-2">
              <DuyenKhoiCircle 
                duyenDirection={duyenDirection}
                mindfulnessActive={mindfulnessActive}
              />
            </div>
        )}
        
        
        {activeMenu === 'meditation' && (
            <div className="w-full h-full p-2 md:p-4">
              <MeditationTimer />
            </div>
        )}
      </div>
    </div>
  );
};

export default DhammaVisualizerV2;