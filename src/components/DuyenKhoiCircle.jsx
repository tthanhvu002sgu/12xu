import React, { useState, useEffect } from 'react';

const DuyenKhoiCircle = ({ duyenDirection, mindfulnessActive }) => {
  const [hoveredNidana, setHoveredNidana] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [mindfulnessTarget, setMindfulnessTarget] = useState(7);
  const [pinnedNidana, setPinnedNidana] = useState(null);

  // Vị trí cố định cho tooltip Thọ (sử dụng position absolute trong container)
  const thoTooltipStyle = {
    position: 'absolute',
    top: '40%',
    left: '54%',
    transform: 'none'
  };

  useEffect(() => {
    if (!mindfulnessActive) {
      setMindfulnessTarget(7);
    }
  }, [mindfulnessActive]);

  // Danh sách 12 nhân duyên chính
  const nidanas = [
    { id: 1, name: 'Vô Minh', pali: 'Avijjā', description: 'Không hiểu biết về Tứ Thánh Đế', angle: 0 },
    { id: 2, name: 'Hành', pali: 'Saṅkhāra', description: 'Các hành động tạo nghiệp (Thân, Khẩu, Ý)', angle: 30 },
    { id: 3, name: 'Thức', pali: 'Viññāṇa', description: 'Thức tái sinh', angle: 60 },
    { id: 4, name: 'Danh Sắc', pali: 'Nāmarūpa', description: 'Thân và tâm', angle: 90 },
    { id: 5, name: 'Lục Nhập', pali: 'Saḷāyatana', description: 'Sáu căn (mắt, tai, mũi, lưỡi, thân, ý)', angle: 120 },
    { id: 6, name: 'Xúc', pali: 'Phassa', description: 'Sự tiếp xúc', angle: 150 },
    { id: 7, name: 'Thọ', pali: 'Vedanā', description: 'Cảm thọ', angle: 180 },
    { id: 8, name: 'Ái', pali: 'Taṇhā', description: 'Khát ái (Từ Thọ Lạc)', angle: 210, isBreakpoint: true },
    { id: 9, name: 'Thủ', pali: 'Upādāna', description: 'Sự chấp giữ: dục thủ, kiến thủ, giới cấm thủ, ngã luận thủ', angle: 240 },
    { id: 10, name: 'Hữu', pali: 'Bhava', description: 'Nghiệp hữu (nghiệp đưa đến tái sanh)', angle: 270 },
    { id: 11, name: 'Sinh', pali: 'Jāti', description: 'Sự tái sanh vào kiếp sống mới', angle: 300 },
    { id: 12, name: 'Già Chết', pali: 'Jarāmaraṇa', description: 'Già, chết, sầu, bi, khổ, ưu, não', angle: 330 }
  ];

  // Các mắt xích song song với Ái (Sân, Si)
  // Chúng có cùng góc (angle) với Ái (210) nhưng khác bán kính (radiusOffset)
  const parallelNodes = [
    { 
      id: '8b', 
      name: 'Sân', 
      pali: 'Dosa', 
      description: 'Sự bất mãn, nóng giận (Từ Thọ Khổ)', 
      angle: 210, // Cùng góc với Ái
      radiusOffset: 100, // Nằm vòng ngoài
      colorClass: 'bg-orange-700 border-orange-600'
    },
    { 
      id: '8c', 
      name: 'Si', 
      pali: 'Moha', 
      description: 'Sự mê mờ, không biết (Từ Thọ Xả)', 
      angle: 210, // Cùng góc với Ái
      radiusOffset: -100, // Nằm vòng trong
      colorClass: 'bg-slate-600 border-slate-500'
    }
  ];

  const handleNodeClick = (nidana, event) => {
    if (mindfulnessActive && [6, 7, 8].includes(nidana.id)) {
      setMindfulnessTarget(nidana.id);
    }

    // Toggle tooltip for Thọ (7) by click
    if (nidana.id === 7) {
      const willPin = pinnedNidana !== 7;
      setPinnedNidana(willPin ? 7 : null);
      setHoveredNidana(willPin ? 7 : null);
    }
  };

  // Hàm vẽ đường nối (Line)
  const renderLine = (x1, y1, x2, y2, isBroken, strokeColor, opacity, key, label = null) => {
    if (isBroken) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const gapSize = 30;

      // Calculate unit vectors
      const ux = dx / dist;
      const uy = dy / dist;

      // Calculate gap boundary points
      const breakStart = { x: midX - (gapSize / 2) * ux, y: midY - (gapSize / 2) * uy };
      const breakEnd = { x: midX + (gapSize / 2) * ux, y: midY + (gapSize / 2) * uy };

      return (
        <g key={key}>
          <line x1={x1} y1={y1} x2={breakStart.x} y2={breakStart.y} stroke={strokeColor} strokeOpacity={opacity} strokeWidth="2" />
          <line x1={breakEnd.x} y1={breakEnd.y} x2={x2} y2={y2} stroke={strokeColor} strokeOpacity={opacity} strokeWidth="2" />
          {label && <text x={midX} y={midY} fill={strokeColor} fontSize="12" textAnchor="middle" alignmentBaseline="middle">{label}</text>}
        </g>
      );
    }

    return (
      <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeOpacity={opacity} strokeWidth="2" />
    );
  };

  const renderNidanasCircle = () => {
    const centerX = 350;
    const centerY = 350;
    const radius = 220;
    const nodeRadius = 45;

    // Helper tính tọa độ, hỗ trợ offset bán kính
    const getCoords = (angleDeg, rOffset = 0) => {
      const r = radius + rOffset;
      const angleRad = (angleDeg - 90) * (Math.PI / 180);
      return {
        x: centerX + r * Math.cos(angleRad),
        y: centerY + r * Math.sin(angleRad)
      };
    };

    return (
      <div className="relative w-full flex items-center justify-center" style={{ height: '600px' }}>
        <svg width="700" height="700" className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          
          {/* 1. Vẽ các đường nối chính */}
          {nidanas.map((nidana, index) => {
            const nextIndex = (index + 1) % nidanas.length;
            const p1 = getCoords(nidana.angle);
            const p2 = getCoords(nidanas[nextIndex].angle);

            // Logic màu sắc và opacity
            let strokeColor = '#94a3b8';
            let opacity = '0.6';
            
            if (mindfulnessActive) {
               if (nidana.id >= mindfulnessTarget) opacity = '0.2';
               else { strokeColor = '#60a5fa'; opacity = '0.8'; }
            } else {
               if (nidana.id === 6) strokeColor = '#fca5a5';
               if (nidana.id === 7) strokeColor = '#ef4444'; // Thọ -{'>'} Ái
               if (nidana.id === 8) strokeColor = '#991b1b';
            }

            // Xử lý đặc biệt cho Thọ (7) -> Ái (8)
            if (nidana.id === 7) {
              const isBroken = mindfulnessActive && nidana.id === mindfulnessTarget;
              
              // 1. Thọ -> Ái (Thọ Lạc) - Đường giữa
              const lineToAi = renderLine(p1.x, p1.y, p2.x, p2.y, isBroken, strokeColor, opacity, `conn-7-8`, 'Lạc');

              // 2. Thọ -> Sân (Thọ Khổ) - Đường ngoài
              const sanNode = parallelNodes[0];
              const pSan = getCoords(sanNode.angle, sanNode.radiusOffset);
              const lineToSan = renderLine(p1.x, p1.y, pSan.x, pSan.y, isBroken, '#c2410c', opacity, `conn-7-san`, 'Khổ');

              // 3. Thọ -> Si (Thọ Xả) - Đường trong
              const siNode = parallelNodes[1];
              const pSi = getCoords(siNode.angle, siNode.radiusOffset);
              const lineToSi = renderLine(p1.x, p1.y, pSi.x, pSi.y, isBroken, '#475569', opacity, `conn-7-si`, 'Xả');

              return <g key="group-7">{lineToAi}{lineToSan}{lineToSi}</g>;
            }

            // Xử lý đặc biệt cho Ái (8) -> Thủ (9)
            // Cần vẽ thêm đường từ Sân -> Thủ và Si -> Thủ
            if (nidana.id === 8) {
               const pThu = p2; // Điểm đến là Thủ
               const pSan = getCoords(parallelNodes[0].angle, parallelNodes[0].radiusOffset);
               const pSi = getCoords(parallelNodes[1].angle, parallelNodes[1].radiusOffset);
               
               // Đường từ Ái -> Thủ (Mặc định trong loop)
               const lineAiThu = renderLine(p1.x, p1.y, pThu.x, pThu.y, false, strokeColor, opacity, `conn-8-9`);
               
               // Đường từ Sân -> Thủ
               const lineSanThu = renderLine(pSan.x, pSan.y, pThu.x, pThu.y, false, '#c2410c', opacity, `conn-san-9`);
               
               // Đường từ Si -> Thủ
               const lineSiThu = renderLine(pSi.x, pSi.y, pThu.x, pThu.y, false, '#475569', opacity, `conn-si-9`);

               return <g key="group-8">{lineAiThu}{lineSanThu}{lineSiThu}</g>;
            }

            // Các đường nối bình thường khác
            const isBroken = mindfulnessActive && nidana.id === mindfulnessTarget;
            return renderLine(p1.x, p1.y, p2.x, p2.y, isBroken, strokeColor, opacity, `conn-${index}`);
          })}
        </svg>

        {/* 2. Vẽ các Node (Kết hợp nidanas chính và parallelNodes) */}
        <div className="absolute" style={{ width: '700px', height: '700px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {[...nidanas, ...parallelNodes].map((nidana) => {
            // Sử dụng radiusOffset nếu có
            const { x, y } = getCoords(nidana.angle, nidana.radiusOffset || 0);
            const isActive = hoveredNidana === nidana.id;
            
            // --- LOGIC MÀU SẮC THEO 4 PHẦN CỦA 12 NHÂN DUYÊN ---
            let colorClass = nidana.colorClass || 'bg-slate-700 border-slate-600';
            
            // Màu mặc định cho các node chính theo 4 phần
            if (!nidana.colorClass) {
                // Phần 1: Quá Khứ Nhân (Past Causes) - Màu tím đậm
                if ([1, 2].includes(nidana.id)) {
                    colorClass = nidana.id === 1 
                        ? 'bg-purple-900 border-purple-800 ring-2 ring-purple-700' // Vô Minh - gốc rễ chu kỳ cũ
                        : 'bg-purple-700 border-purple-600';
                }
                // Phần 2: Hiện Tại Quả (Present Effects) - Màu xanh dương
                else if ([3, 4, 5, 6, 7].includes(nidana.id)) {
                    if (nidana.id === 6) colorClass = 'bg-blue-500 border-blue-400';
                    else if (nidana.id === 7) colorClass = 'bg-blue-600 border-blue-500';
                    else colorClass = 'bg-blue-700 border-blue-600';
                }
                // Phần 3: Hiện Tại Nhân (Present Causes) - Màu đỏ
                else if ([8, 9, 10].includes(nidana.id)) {
                    colorClass = nidana.id === 8 
                        ? 'bg-red-900 border-red-800 ring-2 ring-red-700' // Ái - gốc rễ chu kỳ mới
                        : nidana.id === 9 
                        ? 'bg-red-700 border-red-600'
                        : 'bg-red-600 border-red-500';
                }
                // Phần 4: Tương Lai Quả (Future Effects) - Màu cam
                else if ([11, 12].includes(nidana.id)) {
                    colorClass = nidana.id === 11 
                        ? 'bg-orange-700 border-orange-600'
                        : 'bg-orange-600 border-orange-500';
                }
            }

            // Hiệu ứng Chánh Niệm
            if (mindfulnessActive) {
              // Nếu là node song song (Sân/Si), coi như cùng cấp với Ái (8)
              const effectiveId = (typeof nidana.id === 'string') ? 8 : nidana.id;
              
              if (effectiveId === mindfulnessTarget) {
                colorClass = 'bg-emerald-600 border-emerald-400 ring-4 ring-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.8)] z-30 scale-110';
              } else if (effectiveId > mindfulnessTarget) {
                colorClass = 'bg-slate-200 border-slate-300 opacity-30 grayscale blur-[1px]';
              } else {
                colorClass = 'bg-slate-600 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]';
              }
            }

            const isClickable = mindfulnessActive && [6, 7, 8].includes(nidana.id);

            return (
              <div
                key={nidana.id}
                className={`absolute transition-all duration-500 ${colorClass} text-white rounded-full shadow-lg flex flex-col items-center justify-center
                  ${isActive ? 'scale-125 z-40' : 'z-10'}
                  ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-white' : 'cursor-default'}
                `}
                style={{
                  width: `${nodeRadius * 2}px`,
                  height: `${nodeRadius * 2}px`,
                  left: `${x - nodeRadius}px`,
                  top: `${y - nodeRadius}px`,
                }}
                onMouseEnter={() => {
                  if (nidana.id === 7) {
                    if (pinnedNidana === 7) setHoveredNidana(7);
                    return;
                  }
                  setHoveredNidana(nidana.id);
                }}
                onMouseLeave={() => {
                  // Nếu đang ghim tooltip Thọ thì giữ nguyên, ngược lại ẩn khi rời chuột
                  if (nidana.id === 7 && pinnedNidana === 7) return;
                  setHoveredNidana(null);
                }}
                onMouseMove={(e) => {
                  // Khi đã ghim Thọ, không cập nhật vị trí theo chuột nữa
                  if (nidana.id === 7 && pinnedNidana === 7) return;
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onClick={(e) => handleNodeClick(nidana, e)}
              >
                <div className="flex flex-col items-center justify-center h-full p-2 pointer-events-none">
                  <div className="text-xs font-bold">{typeof nidana.id === 'number' ? nidana.id : ''}</div>
                  <div className="text-sm font-bold text-center leading-tight">{nidana.name}</div>
                  <div className="text-[10px] opacity-75">{nidana.pali}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip Overlay */}
        {(() => {
          const activeTooltip = pinnedNidana || hoveredNidana;
          if (!activeTooltip) return null;

          const allNodes = [...nidanas, ...parallelNodes];
          const nidana = allNodes.find(n => n.id === activeTooltip);
          if (!nidana) return null;
          
          if (nidana.id === 7) {
            return (
              <div 
                className="z-[9999] pointer-events-auto flex gap-4"
                style={thoTooltipStyle}
              >
                {/* Lý thuyết Tooltip */}
                <div className="bg-slate-900 text-white p-4 rounded-lg shadow-xl w-80 border-2 border-blue-500 overflow-y-auto max-h-[40vh]">
                  <div className="text-sm font-bold mb-2 text-blue-300 border-b border-slate-700 pb-1">📖 Lý thuyết về Thọ (Vedanā)</div>
                  <div className="text-[11px] space-y-2 leading-relaxed">
                    <div className="space-y-1">
                      <p>2 thọ (Thân, Tâm).</p>
                      <p>3 thọ (Lạc, Khổ, Xả).</p>
                      <p>5 thọ (Lạc, Khổ, Hỷ, Ưu, Xả).</p>
                      <p>6 thọ (Do nhãn, nhĩ, tỷ, thiệt, thân, ý xúc).</p>
                      <p>18 thọ: 6 căn x 3 thọ</p>
                      <p>36 thọ: 18 thọ liên quan đến gia đình (dục), 18 thọ liên quan đến xuất ly (ly dục)</p>
                      <p>108 thọ: 36 thọ quá khứ, 36 thọ tương lai, 36 thọ hiện tại</p>
                    </div>

                    <div className="bg-slate-800 p-2 rounded border-l-2 border-blue-400 space-y-2">
                      <p>Do xúc tập khởi nên thọ tập khởi. Do xúc đoạn diệt nên thọ đoạn diệt. Con đường Thánh đạo Tám ngành là con đường đưa đến thọ đoạn diệt, tức là chánh tri kiến… chánh định. Do duyên thọ khởi lên lạc hỷ nào, đấy là vị ngọt của thọ. Sự vô thường, khổ, biến hoại của thọ là sự nguy hiểm của thọ. Sự nhiếp phục dục và tham (chandaràga) đối với thọ, sự đoạn tận dục và tham là sự xuất ly của thọ.</p>
                      <div className="space-y-1 text-amber-200">
                        <p>Lạc thọ -{'>'} tham tùy miên</p>
                        <p>Khổ thọ -{'>'} sân tùy miên</p>
                        <p>Xả thọ -{'>'} vô minh tùy miên</p>
                      </div>
                      <p className="text-[10px] text-slate-300">Khổ thân: mũi tên 1 | Khổ tâm: mũi tên 2</p>
                    </div>

                    <div className="space-y-1 border-t border-slate-700 pt-2">
                      <p className="font-bold text-blue-300">Lạc vật chất (Dục lạc): Do 5 dục (Sắc, thanh...) -{'>'} Thấp nhất.</p>
                      <div className="pl-2 space-y-1">
                        <p>Lạc phi vật chất (Thiền định):</p>
                        <p>Sơ thiền (Ly dục).</p>
                        <p>Nhị thiền (Định sanh hỷ lạc).</p>
                        <p>Tam thiền (Xả niệm lạc trú).</p>
                        <p>Tứ thiền (Xả thanh tịnh - Vắng mặt khổ vui).</p>
                      </div>
                      <p className="font-bold text-emerald-300">Lạc Tối thượng (Giải thoát): Diệt thọ tưởng định & A-la-hán quả -{'>'} Sự vắng mặt hoàn toàn của các Hành và Lậu hoặc.</p>
                    </div>

                    <p className="text-right text-[10px] opacity-70">Nguồn gốc: do Xúc</p>
                  </div>
                </div>

                {/* Phương pháp Tooltip */}
                <div className="bg-emerald-950 text-white p-4 rounded-lg shadow-xl w-80 border-2 border-emerald-500 overflow-y-auto max-h-[40vh]">
                  <div className="text-sm font-bold mb-2 text-emerald-300 border-b border-emerald-800 pb-1">🧘 Phương pháp thực hành</div>
                  <div className="text-[11px] space-y-2 leading-relaxed">
                    <div className="space-y-1">
                      <p>Chánh Niệm + Tỉnh Giác: Luôn hay biết rõ ràng mọi cử động (đi, đứng, nằm, ngồi, co, duỗi...) để kịp thời bắt được Thọ ngay khi nó vừa sinh khởi. -{'>'} biết được Thọ ấy khởi lên -{'>'} Thọ ấy có duyên (để khởi lên) do thân/xúc -{'>'} 3 bước quán ở dưới</p>
                      <p>Ly dục: Tách rời khỏi các dục lạc vật chất để tâm có đủ độ tĩnh lặng (Định) mà quan sát.</p>
                    </div>

                    <div className="bg-emerald-900/50 p-2 rounded border-l-2 border-yellow-500 space-y-1">
                      <p className="font-bold text-yellow-400 text-[10px]">KỸ THUẬT "TÁCH LỚP" (XỬ LÝ KHI CẬN TỬ/ĐAU ĐỚN TỘT ĐỘ)</p>
                      <p>Khi thọ khổ lên đến cực điểm (Cảm giác cùng tận sức chịu đựng của sinh mạng):</p>
                      <p>Bước 1: Truy nguyên nhân. Thọ này từ đâu ra? -{'>'} Từ Thân/Xúc.</p>
                      <p>Bước 2: Phủ định cơ sở. Thân/Xúc là vô thường, hư hoại -{'>'} Thì Thọ sinh ra từ nó làm sao thường hằng được?</p>
                      <p>Bước 3: Buông xả. Tuệ tri: "Sau khi thân hoại mạng chung, mọi cảm thọ này sẽ lắng dịu (như ngọn đèn tắt vì hết dầu)". Không còn gì đáng để nắm giữ hay sợ hãi.</p>
                    </div>

                    <div className="bg-slate-900/50 p-2 rounded space-y-1">
                      <p>lạc thọ: tác ý “là khổ”</p>
                      <p>khổ thọ: tác ý “là mũi tên”</p>
                      <p>xả thọ: tác ý “là vô thường”</p>
                    </div>

                    <div className="space-y-1 border-t border-emerald-800 pt-2">
                      <p>Từ bỏ hỷ lạc vật chất -{'>'} Tìm hỷ lạc phi vật chất (Thiền định).</p>
                      <p>Từ bỏ Hỷ (Sơ/Nhị thiền) -{'>'} Tìm Lạc (Tam thiền).</p>
                      <p>Từ bỏ Lạc -{'>'} Tìm Xả (Tứ thiền).</p>
                      <p>Vượt qua các Tưởng -{'>'} Các tầng thiền Vô sắc.</p>
                      <p>Đích đến: Diệt Thọ Tưởng Định.</p>
                      <p>Tại đây: Tưởng và Thọ bị đoạn diệt/tịnh chỉ hoàn toàn.</p>
                      <p>Đoạn tận Tham, Sân, Si.</p>
                      <p>Đạt được Hạnh phúc tối thượng (Sự vắng mặt của khổ).</p>
                    </div>

                    <div className="bg-emerald-900/30 p-2 rounded italic text-emerald-200 border border-emerald-800">
                      Nếu có thọ nào khởi lên -{'>'} Tuệ tri: “Thọ ấy là vô thường - Ta không chấp trước thọ ấy - Ta không hoan hỷ thọ ấy."
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          
          const isKeyPoint = [6, 8].includes(nidana.id);

          return (
            <div 
              className="fixed z-[9999] pointer-events-none"
              style={{ 
                left: `${tooltipPos.x + 20}px`, 
                top: `${tooltipPos.y}px`,
                transform: 'translateY(-50%)'
              }}
            >
              {isKeyPoint ? (
                <div className="bg-emerald-900 text-white p-4 rounded-lg shadow-xl w-80 border-2 border-emerald-600">
                  <div className="text-sm font-bold mb-2 text-emerald-200">🔓 Cách Cắt Đứt Vòng Luân Hồi:</div>
                  <div className="text-xs space-y-2 leading-relaxed">
                    <p>• Khi <span className="font-semibold text-amber-300">Cảm thọ</span> sanh khởi → Thiết lập <span className="font-semibold text-emerald-300">Chánh niệm</span></p>
                    <p>• Thay vì để Thọ sinh ra <span className="font-semibold text-red-300">Ái, Sân, Si</span></p>
                    <p>• Chánh niệm giúp thấy rõ <span className="font-semibold">sự Sanh-Diệt</span> của cảm thọ</p>
                    <p className="text-emerald-200 font-medium mt-2">→ Thấy Sanh: Có Tinh tấn, Niệm, Định</p>
                    <p className="text-emerald-200 font-medium">→ Thấy Diệt: Có Tuệ (Chánh kiến, Chánh tư duy)</p>
                    {mindfulnessActive && (
                      <p className="text-yellow-300 italic mt-2 border-t border-emerald-700 pt-2">
                        Click vào Xúc, Thọ hoặc Ái để thay đổi điểm ứng dụng Chánh niệm.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl w-64">
                  <div className="text-sm leading-relaxed">{nidana.description}</div>
                </div>
              )}
            </div>
          );
        })()}

        <div className="absolute bg-white rounded-full shadow-xl p-6 border-4 border-slate-300" style={{
          width: '140px',
          height: '140px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl font-bold text-slate-700">12</div>
            <div className="text-sm font-bold text-slate-600 text-center">Nhân Duyên</div>
            <div className="text-xs text-slate-500 mt-1 text-center">Paṭicca-samuppāda</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      {/* Diagram */}
      {/* <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-700 border-l-4 border-indigo-500 pl-3 mb-2">
          Vòng 12 Nhân Duyên (Paṭicca-samuppāda)
        </h2>
        <p className="text-sm text-slate-600 ml-5">
          {duyenDirection === 'forward' 
            ? 'Chiều thuận: Sự tập khởi của khổ đau' 
            : 'Chiều nghịch: Sự đoạn diệt của khổ đau'}
        </p>
      </div> */}

      <div className="bg-white rounded-2xl shadow-lg p-8 pt-0 border border-slate-200">
        {renderNidanasCircle()}
      </div>

      {/* Chú thích màu sắc */}
      <div className="mt-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-800 mb-3 text-center">🎨 Phân loại 4 giai đoạn của Vòng 12 Nhân Duyên</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-purple-900 rounded-full border-2 border-purple-700 shadow-md"></div>
            <div className="text-xs">
              <span className="font-semibold text-purple-900">Quá Khứ Nhân:</span>
              <span className="text-slate-600 ml-1">Vô Minh ★, Hành</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-700 rounded-full border-2 border-blue-600 shadow-md"></div>
            <div className="text-xs">
              <span className="font-semibold text-blue-800">Hiện Tại Quả:</span>
              <span className="text-slate-600 ml-1">Thức, Danh Sắc, Lục Nhập, Xúc, Thọ</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-900 rounded-full border-2 border-red-700 shadow-md"></div>
            <div className="text-xs">
              <span className="font-semibold text-red-900">Hiện Tại Nhân:</span>
              <span className="text-slate-600 ml-1">Ái ★, Thủ, Hữu</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-700 rounded-full border-2 border-orange-600 shadow-md"></div>
            <div className="text-xs">
              <span className="font-semibold text-orange-800">Tương Lai Quả:</span>
              <span className="text-slate-600 ml-1">Sinh, Già Chết</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-2 text-xs text-slate-500">
          ★ = Gốc rễ của chu kỳ (Vô Minh: chu kỳ cũ, Ái: chu kỳ mới)
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-blue-900 font-medium">
          {mindfulnessActive 
            ? "💡 Bạn đang bật chế độ Chánh Niệm. Hãy thử click vào Xúc, Thọ hoặc Ái để xem cách chánh niệm cắt đứt vòng luân hồi tại các thời điểm khác nhau."
            : "💡 Di chuột qua các mắc xích để xem mô tả. Chú ý màu đỏ đậm dần từ Xúc → Thọ → Ái thể hiện sự bám rễ của ô nhiễm."}
        </p>
      </div>
     
    </div>
  );
};

export default DuyenKhoiCircle;