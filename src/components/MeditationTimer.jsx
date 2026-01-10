import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Wind, Eye, Heart, Hand, Smile, Scale, Settings, BookOpen } from 'lucide-react';
import bellSound from '../assets/bell.mp3';

// === DỮ LIỆU LỜI DẪN (GIỮ NGUYÊN) ===
const TEXT_PHASE_1_INTRO = [
  "Hãy ngồi thẳng lưng, thả lỏng toàn thân.",
  "Để lại thế giới bên ngoài.",
  "Bây giờ, chỉ có bạn và cơ thể này."
];
const TEXT_PHASE_1_CONNECT = [
  "Hãy đưa tâm về cửa mũi.",
  "Cảm nhận luồng gió đi vào... và đi ra.",
  "Đừng cố điều khiển hơi thở. Để cơ thể tự thở."
];
const TEXT_PHASE_1_ANCHOR = [
  "Khi hơi thở vào, biết rõ hơi thở vào.",
  "Khi hơi thở ra, biết rõ hơi thở ra.",
  "Nếu có suy nghĩ đến, hãy biết 'đây là suy nghĩ'.",
  "Nhẹ nhàng buông bỏ, quay lại với hơi thở.",
  "Hơi thở là ngôi nhà duy nhất lúc này.",
  "Chỉ quan sát. Gió chạm vào, gió đi ra.",
  "Tâm tỉnh thức, sáng tỏ trên điểm xúc chạm."
];
const TEXT_PHASE_2_VIPASSANA = [
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
const TEXT_METTA = [
  "Hãy khởi lên ý niệm về sự an lành. Bắt đầu từ chính bạn, rồi lan tỏa ra xung quanh như ánh sáng ngọn đèn.",
  "Nguyện cho tất cả chúng sanh ở phương Đông... phương Tây... phương Nam... phương Bắc.",
  "Dù là loài to lớn hay nhỏ bé, hữu hình hay vô hình, đang sinh hay sắp sinh. Hãy để tâm từ của bạn bao trùm tất cả, không chừa một ai, không biên giới, không hận thù.",
  "Mong chúng sinh không oan trái, thù hận",
  "Không khổ tâm, phiền não",
  "Không đau đớn, tật bệnh",
  "Được an vui hạnh phúc"
];
const TEXT_KARUNA = [
  "Hãy hướng tâm đến những chúng sanh đang chịu đau đớn, bệnh tật, đói khát, sợ hãi trong khắp các cõi, từ địa ngục tối tăm đến nhân gian đầy biến động.",
  "Đừng quay mặt đi. Hãy nhìn nỗi khổ của họ với trái tim rộng mở.",
  "Nguyện cho tất cả chúng sanh: Thoát khỏi mọi khổ đau. Thoát khỏi mọi sự bức bách. Mong cho họ sớm được giải phóng.",
  "Như người mẹ hiền muốn nhổ mũi tên độc ra khỏi người con. Hãy rải tâm Bi này đến khắp mười phương."
];
const TEXT_MUDITA = [
  "Hãy nghĩ đến những chúng sanh đang có được hạnh phúc, thành công, giàu sang, hay đang tạo phước lành.",
  "Thay vì so sánh hay đố kỵ, hãy hân hoan cùng họ.",
  "Nguyện cho thành tựu của họ không bị thối thất. Nguyện cho hạnh phúc của họ được duy trì và tăng trưởng.",
  "Thấy người khác vui, tâm tôi cũng nở hoa. Không còn bóng dáng của sự hẹp hòi, ích kỷ."
];
const TEXT_UPEKKHA = [
  "Dù ta thương (Từ) hay ta xót (Bi), mỗi chúng sanh đều là chủ nhân của nghiệp mình tạo ra.",
  "Hạnh phúc hay khổ đau của họ tùy thuộc vào hành động của họ, không phụ thuộc vào mong muốn của ta.",
  "Tất cả chúng sanh là người thừa tự của nghiệp. (Kammassakā)",
  "Hãy giữ tâm thăng bằng như mặt đất. Không thiên vị người thân, không ghét bỏ kẻ thù. Nhìn tất cả chúng sanh bình đẳng trước quy luật Nhân Quả.",
  "Trụ tâm trong sự tĩnh lặng, sáng suốt và buông xả hoàn toàn."
];

// === CẤU HÌNH ROUTINE ===
const ROUTINES = {
  breath_insight: {
    id: 'breath_insight',
    name: 'Hơi thở & Tuệ (15 Phút)',
    totalTime: 15 * 60,
    phases: [
      { id: 'SAMATHA', label: 'THIỀN ĐỊNH', sub: '(10 Phút)', duration: 600, icon: Wind },
      { id: 'VIPASSANA', label: 'THIỀN TUỆ', sub: '(5 Phút)', duration: 300, icon: Eye }
    ],
    getTexts: (elapsed) => {
      if (elapsed < 60) return TEXT_PHASE_1_INTRO;
      if (elapsed < 120) return TEXT_PHASE_1_CONNECT;
      if (elapsed < 600) return TEXT_PHASE_1_ANCHOR;
      return TEXT_PHASE_2_VIPASSANA;
    }
  },
  four_immeasurables: {
    id: 'four_immeasurables',
    name: 'Tứ Vô Lượng Tâm (20 Phút)',
    totalTime: 20 * 60,
    phases: [
      { id: 'METTA', label: 'TÂM TỪ', sub: '(Đối trị Sân)', duration: 300, icon: Heart },
      { id: 'KARUNA', label: 'TÂM BI', sub: '(Đối trị Hại)', duration: 300, icon: Hand },
      { id: 'MUDITA', label: 'TÂM HỶ', sub: '(Đối trị Ganh)', duration: 300, icon: Smile },
      { id: 'UPEKKHA', label: 'TÂM XẢ', sub: '(Quân bình)', duration: 300, icon: Scale }
    ],
    getTexts: (elapsed) => {
      if (elapsed < 300) return TEXT_METTA;
      if (elapsed < 600) return TEXT_KARUNA;
      if (elapsed < 900) return TEXT_MUDITA;
      return TEXT_UPEKKHA;
    }
  }
};

const MeditationTimer = () => {
  const [selectedRoutine, setSelectedRoutine] = useState('breath_insight');
  const activeRoutine = ROUTINES[selectedRoutine];

  const [timeLeft, setTimeLeft] = useState(activeRoutine.totalTime);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State for text rotation
  const [currentText, setCurrentText] = useState("");
  const [fadeState, setFadeState] = useState("opacity-0");
  const textIndexRef = useRef(0);
  
  const timeLeftRef = useRef(timeLeft);
  const currentTextGroupRef = useRef(null);

  // Helper play sound
  const playBell = () => {
    try {
      const audio = new Audio(bellSound);
      audio.volume = 0.6;
      audio.play().catch(e => console.error("Không thể phát âm thanh:", e));
    } catch (error) {
      console.error("Lỗi khởi tạo Audio:", error);
    }
  };

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const getCurrentPhase = () => {
    const elapsed = activeRoutine.totalTime - timeLeft;
    let accumulated = 0;
    for (const phase of activeRoutine.phases) {
      accumulated += phase.duration;
      if (elapsed < accumulated) return phase;
    }
    return activeRoutine.phases[activeRoutine.phases.length - 1];
  };

  const currentPhaseObj = getCurrentPhase();

  // Reset when routine changes
  useEffect(() => {
    resetTimer();
  }, [selectedRoutine]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsCompleted(true);
      setIsActive(false);
      playBell();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Text Rotation Logic
  useEffect(() => {
    if (!isActive || isCompleted) {
      setCurrentText("");
      textIndexRef.current = 0;
      currentTextGroupRef.current = null;
      return;
    }

    const displayText = () => {
      const currentLeft = timeLeftRef.current;
      const elapsed = activeRoutine.totalTime - currentLeft;
      const texts = activeRoutine.getTexts(elapsed);
      
      if (currentTextGroupRef.current !== texts) {
        textIndexRef.current = 0;
        currentTextGroupRef.current = texts;
      }

      const index = textIndexRef.current % texts.length;
      setCurrentText(texts[index]);
      setFadeState("opacity-100 translate-y-0");

      setTimeout(() => {
        setFadeState("opacity-0 translate-y-4");
      }, 8000);

      textIndexRef.current += 1;
    };

    displayText();
    const interval = setInterval(displayText, 10000);
    return () => clearInterval(interval);
  }, [isActive, isCompleted, activeRoutine]);

  const toggleTimer = () => {
    if (!isActive && timeLeft === activeRoutine.totalTime) {
      playBell();
    }
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(activeRoutine.totalTime);
    setIsCompleted(false);
    textIndexRef.current = 0;
    setFadeState("opacity-0");
  };

  const formatTime = (seconds) => {
    if (seconds === 0) return "00";
    // Làm tròn lên để hiển thị phút còn lại (VD: 14:59 -> 15 phút)
    // Tránh việc hiển thị tụt phút ngay lập tức khi bấm Start
    const mins = Math.ceil(seconds / 60);
    return mins.toString().padStart(2, '0');
  };

  // === UI PHONG CÁCH KINDLE (ĐEN TRẮNG/SANS-SERIF) ===

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-white text-center relative z-20 font-sans">
        <div className="bg-white p-10 rounded-sm border-2 border-black max-w-2xl w-full">
          <CheckCircle2 size={64} className="text-black mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-black mb-6 uppercase tracking-wider">Hồi Hướng Công Đức</h2>
          <div className="text-xl md:text-2xl text-black italic leading-loose space-y-4 font-sans">
            <p>"Nguyện cho mọi chúng sinh được an vui, hạnh phúc."</p>
            <p>"Sớm ngày chứng đắc Đạo, Quả."</p>
            <p>"Sớm ngày giải thoát khỏi sinh tử luân hồi."</p>
            <p className="font-bold">"Và mong cho tôi cũng được như vậy."</p>
          </div>
          <button 
            onClick={resetTimer}
            className="mt-10 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto font-bold rounded-sm uppercase tracking-widest text-sm"
          >
            <RotateCcw size={16} /> Bắt đầu lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full bg-white text-black relative rounded-md font-sans">
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 p-6">
        
        {/* Buttons Chọn Routine - Kiểu Kindle */}
        {!isActive && !isCompleted && (
          <div className="flex items-center gap-0 border border-black rounded-sm overflow-hidden mb-6 shadow-sm">
            {Object.values(ROUTINES).map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRoutine(r.id)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider border-r border-black last:border-r-0 transition-all ${
                  selectedRoutine === r.id 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {r.name.split('(')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Thanh trạng thái Phase - Đen trắng tối giản */}
        <div className="flex flex-wrap justify-center gap-0 w-full mb-6">
          {activeRoutine.phases.map((p, index) => {
            const isCurrent = currentPhaseObj.id === p.id;
            return (
              <div 
                key={p.id} 
                className={`
                  px-8 py-3 border-y-2 border-black flex items-center gap-2 transition-all duration-300
                  ${index === 0 ? 'border-l-2 rounded-l-sm' : ''}
                  ${index === activeRoutine.phases.length - 1 ? 'border-r-2 rounded-r-sm' : ''}
                  ${isCurrent ? 'bg-black text-white' : 'bg-white text-gray-400'}
                `}
              >
                <div className="flex flex-col items-center leading-none">
                  <span className="font-bold text-xs uppercase tracking-widest">{p.label}</span>
                  {isCurrent && <span className="text-[10px] mt-1 opacity-80">{p.sub}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Đồng hồ số lớn - E-Ink Style */}
        <div className="relative group cursor-default my-4">
          <div className="flex items-baseline justify-center">
            <div className="text-[7rem] md:text-[10rem] font-bold tabular-nums leading-none tracking-tighter text-black font-sans">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-400 ml-2 md:ml-4 uppercase tracking-widest transform -translate-y-4 md:-translate-y-6">
              PHÚT
            </div>
          </div>
          
          
        </div>

        {/* Lời dẫn hiển thị */}
        <div className="h-48 flex items-center justify-center w-full max-w-2xl text-center px-4 relative">
          <p className={`text-2xl md:text-3xl leading-relaxed text-black font-sans font-medium transform ${fadeState}`}
             style={{ transition: 'opacity 1s ease-in-out, transform 1s ease-in-out' }}
          >
            {currentText}
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-black opacity-10 rounded-full"></div>
        </div>

        {/* Nút điều khiển - Hình khối đặc */}
        <div className="flex gap-8 mt-6">
          <button 
            onClick={toggleTimer}
            className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform border-2 border-black"
          >
            {isActive ? <Pause size={32} fill="white" /> : <Play size={32} className="ml-1" fill="white" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-20 h-20 rounded-full bg-white text-black border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        {!isActive && (
           <div className="text-gray-400 text-xs mt-4 uppercase tracking-widest font-sans">
             Nhấn nút Play để bắt đầu
           </div>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;