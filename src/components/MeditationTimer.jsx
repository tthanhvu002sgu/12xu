import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Wind, Eye } from 'lucide-react';

// === DỮ LIỆU LỜI DẪN ===

const TEXT_PHASE_1_INTRO = [ // Phút 0-1
  "Hãy ngồi thẳng lưng, thả lỏng toàn thân.",
  "Để lại thế giới bên ngoài.",
  "Bây giờ, chỉ có bạn và cơ thể này."
];

const TEXT_PHASE_1_CONNECT = [ // Phút 1-2
  "Hãy đưa tâm về cửa mũi.",
  "Cảm nhận luồng gió đi vào... và đi ra.",
  "Đừng cố điều khiển hơi thở. Để cơ thể tự thở."
];

const TEXT_PHASE_1_ANCHOR = [ // Phút 2-10
  "Khi hơi thở vào, biết rõ hơi thở vào.",
  "Khi hơi thở ra, biết rõ hơi thở ra.",
  "Nếu có suy nghĩ đến, hãy biết 'đây là suy nghĩ'.",
  "Nhẹ nhàng buông bỏ, quay lại với hơi thở.",
  "Hơi thở là ngôi nhà duy nhất lúc này.",
  "Chỉ quan sát. Gió chạm vào, gió đi ra.",
  "Tâm tỉnh thức, sáng tỏ trên điểm xúc chạm."
];

const TEXT_PHASE_2_VIPASSANA = [ // Phút 10-15
  "Chuyển sang Thiền Tuệ - Quán chiếu thực tính.",
  "Sắc là vô thường, do vô thường nên khổ.",
  "Hãy quán như thật: 'Cái này không phải là ta, không phải của ta'.",
  "Tương tự với Thọ, Tưởng, Hành, Thức.",
  "Mắt, Tai, Mũi, Lưỡi, Thân, Ý đang trôi chảy như dòng thác lũ.",
  "Sắc, Thanh, Hương, Vị, Xúc, Pháp không có gì đáng để nắm giữ.",
  "Không có gì là Tôi hay Của Tôi.",
  "Thấy sự sanh diệt ấy, tâm nhàm chán các hành.",
  "Tâm buông thư. Trở về trạng thái rỗng rang, tịch tĩnh."
];

const TOTAL_TIME = 15 * 60; // 15 minutes in seconds
const PHASE_1_END = 5 * 60; // Phase 1 ends when timeLeft implies 10 mins passed (so at 5 mins left)

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State for text rotation
  const [currentText, setCurrentText] = useState("");
  const [fadeState, setFadeState] = useState("opacity-0"); // opacity-0 or opacity-100
  const textIndexRef = useRef(0);
  const textSetRef = useRef("intro"); // intro, connect, anchor, vipassana

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Determine current phase & text set based on time elapsed
  const elapsedTime = TOTAL_TIME - timeLeft;
  const currentPhase = elapsedTime < 10 * 60 ? 'SAMATHA' : 'VIPASSANA';
  
  useEffect(() => {
    // Logic to switch text sets
    let newTextSet = "";
    if (elapsedTime < 60) newTextSet = "intro";
    else if (elapsedTime < 120) newTextSet = "connect";
    else if (elapsedTime < 600) newTextSet = "anchor";
    else if (elapsedTime < 900) newTextSet = "vipassana";

    if (newTextSet !== textSetRef.current) {
      textSetRef.current = newTextSet;
      textIndexRef.current = 0; // Reset index when moving to new phase part
    }
  }, [elapsedTime]);

  // Text Rotation Animation Logic
  useEffect(() => {
    if (!isActive || isCompleted) return;

    let timeoutFadeIn;
    let timeoutFadeOut;
    let timeoutNext;

    const cycleText = () => {
      // 1. Determine which array to use
      let sourceArray = [];
      switch (textSetRef.current) {
        case "intro": sourceArray = TEXT_PHASE_1_INTRO; break;
        case "connect": sourceArray = TEXT_PHASE_1_CONNECT; break;
        case "anchor": sourceArray = TEXT_PHASE_1_ANCHOR; break;
        case "vipassana": sourceArray = TEXT_PHASE_2_VIPASSANA; break;
        default: sourceArray = TEXT_PHASE_1_INTRO;
      }

      // 2. Set content
      const index = textIndexRef.current % sourceArray.length;
      setCurrentText(sourceArray[index]);

      // 3. Fade In
      setFadeState("opacity-100 translate-y-0");

      // 4. Wait, then Fade Out
      const displayDuration = 5000; // 5 seconds display
      timeoutFadeOut = setTimeout(() => {
        setFadeState("opacity-0 translate-y-2");
      }, displayDuration);

      // 5. Prepare next cycle
      const transitionTime = 1000; // 1 second for fade out transition
      timeoutNext = setTimeout(() => {
        textIndexRef.current += 1;
        cycleText();
      }, displayDuration + transitionTime);
    };

    cycleText();

    return () => {
      clearTimeout(timeoutFadeIn);
      clearTimeout(timeoutFadeOut);
      clearTimeout(timeoutNext);
    };
  }, [isActive, isCompleted, textSetRef.current]); // Re-run when active changes or phase part changes effectively

  // Helpers
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TOTAL_TIME);
    setIsCompleted(false);
    textIndexRef.current = 0;
    textSetRef.current = "intro";
    setFadeState("opacity-0");
  };

  // === RENDERING ===

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-amber-50 to-orange-50 text-center animate-fade-in">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl border-2 border-amber-200">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-amber-800 mb-6">Hồi Hướng Công Đức</h2>
          <div className="text-xl md:text-2xl font-serif text-slate-700 italic leading-loose space-y-4">
            <p>"Nguyện cho mọi chúng sinh được an vui, hạnh phúc."</p>
            <p>"Sớm ngày chứng đắc Đạo, Quả."</p>
            <p>"Sớm ngày giải thoát khỏi sinh tử luân hồi."</p>
            <p className="font-bold text-amber-700">"Và mong cho tôi cũng được như vậy."</p>
          </div>
          <button 
            onClick={resetTimer}
            className="mt-10 px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors flex items-center gap-2 mx-auto font-bold"
          >
            <RotateCcw size={18} /> Bắt đầu lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full bg-slate-900 text-slate-200 relative overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${currentPhase === 'SAMATHA' ? 'opacity-20 bg-blue-900' : 'opacity-20 bg-emerald-900'}`}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8 p-6">
        
        {/* Phase Indicator */}
        <div className="flex gap-4 mb-4">
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-all duration-500 ${
            currentPhase === 'SAMATHA' 
              ? 'bg-blue-500/20 border-blue-400 text-blue-200 scale-110 shadow-lg shadow-blue-500/20' 
              : 'bg-slate-800/50 border-slate-700 text-slate-500 grayscale'
          }`}>
            <Wind size={18} />
            <span className="font-bold text-sm tracking-wider">PHẦN 1: THIỀN ĐỊNH</span>
            <span className="text-xs opacity-70">(10 Phút)</span>
          </div>
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-all duration-500 ${
            currentPhase === 'VIPASSANA' 
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/20' 
              : 'bg-slate-800/50 border-slate-700 text-slate-500 grayscale'
          }`}>
            <Eye size={18} />
            <span className="font-bold text-sm tracking-wider">PHẦN 2: THIỀN TUỆ</span>
            <span className="text-xs opacity-70">(5 Phút)</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="relative group cursor-default">
          <div className="text-[8rem] md:text-[10rem] font-bold tabular-nums leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 font-mono transition-all">
            {formatTime(timeLeft)}
          </div>
          {/* Progress Ring Background */}
           <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -rotate-90 pointer-events-none opacity-10">
              <circle r="45%" cx="50%" cy="50%" fill="transparent" stroke="white" strokeWidth="2" />
              <circle 
                r="45%" cx="50%" cy="50%" 
                fill="transparent" 
                stroke={currentPhase === 'SAMATHA' ? '#60a5fa' : '#34d399'}
                strokeWidth="4" 
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * (TOTAL_TIME - timeLeft) / TOTAL_TIME)}
                className="transition-all duration-1000"
              />
           </svg>
        </div>

        {/* Dynamic Guidance Text */}
        <div className="h-40 flex items-center justify-center w-full max-w-2xl text-center px-4">
          <p className={`text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-blue-100 transition-all duration-1000 transform ${fadeState}`}>
            {currentText}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-6 mt-8">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95 ${
              isActive 
                ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-500' 
                : 'bg-white text-slate-900 hover:bg-slate-200'
            }`}
          >
            {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center transition-all shadow-lg hover:bg-slate-700 hover:text-white hover:scale-105"
            title="Đặt lại"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        {/* Helper Note */}
        {!isActive && timeLeft === TOTAL_TIME && (
           <div className="text-slate-500 text-sm mt-4 animate-pulse">
             Nhấn nút Play để bắt đầu phiên thiền 15 phút
           </div>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;