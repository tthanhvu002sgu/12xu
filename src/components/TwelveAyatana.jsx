import React, { useState, useEffect, useRef } from 'react';
import { Eye, Ear, Wind, Smile, Hand, Brain, Flame, BookOpen, Clock, ShieldAlert, Activity, Heart, Anchor, Scale, RotateCcw, GripVertical } from 'lucide-react';

const TwelveAyatana = () => {
  const [selectedSense, setSelectedSense] = useState('eye');
  const [targetType, setTargetType] = useState('internal');
  const [selectedFormula, setSelectedFormula] = useState('tam_tuong');
  const [formulaOrder, setFormulaOrder] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  
  const MIN_SIDEBAR_WIDTH = 250;
  const MAX_SIDEBAR_WIDTH = 600;
  const MIN_SCRIPTURE_WIDTH = 350;
  const MAX_SCRIPTURE_WIDTH = 800;
  const MIN_FLOWCHART_WIDTH = 400;
  
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [scriptureWidth, setScriptureWidth] = useState(500);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingScripture, setIsResizingScripture] = useState(false);
  
  const containerRef = useRef(null);

  // Dữ liệu 6 Căn & 6 Cảnh
  const senses = {
    eye: { id: 'eye', label: 'Mắt', icon: Eye, internal: 'Mắt', external: 'Các Sắc', consciousness: 'Nhãn thức', contact: 'Nhãn xúc' },
    ear: { id: 'ear', label: 'Tai', icon: Ear, internal: 'Tai', external: 'Các Tiếng', consciousness: 'Nhĩ thức', contact: 'Nhĩ xúc' },
    nose: { id: 'nose', label: 'Mũi', icon: Wind, internal: 'Mũi', external: 'Các Hương', consciousness: 'Tỷ thức', contact: 'Tỷ xúc' },
    tongue: { id: 'tongue', label: 'Lưỡi', icon: Smile, internal: 'Lưỡi', external: 'Các Vị', consciousness: 'Thiệt thức', contact: 'Thiệt xúc' },
    body: { id: 'body', label: 'Thân', icon: Hand, internal: 'Thân', external: 'Các Xúc', consciousness: 'Thân thức', contact: 'Thân xúc' },
    mind: { id: 'mind', label: 'Ý', icon: Brain, internal: 'Ý', external: 'Các Pháp', consciousness: 'Ý thức', contact: 'Ý xúc' },
  };

  const currentSenseData = senses[selectedSense];
  const currentSubject = targetType === 'internal' ? currentSenseData.internal : currentSenseData.external;

  // Dữ liệu các công thức (giữ nguyên content)
  const formulas = {
    tam_tuong: {
      id: 'tam_tuong',
      title: '1. Tam Tướng (Vô thường - Khổ - Vô ngã)',
      icon: Activity,
      color: 'blue',
      description: 'Quán sát tính chất thật của Căn và Cảnh',
      flow: [
        { label: 'QUÁN SÁT', text: `${currentSubject} là Vô thường`, type: 'input' },
        { label: 'SUY DIỄN 1', text: 'Cái gì Vô thường là Khổ', type: 'process' },
        { label: 'SUY DIỄN 2', text: 'Cái gì Khổ là Vô ngã', type: 'process' },
        { label: 'CHÁNH TRÍ TUỆ', text: '"Cái này không phải của tôi, không phải là tôi, không phải tự ngã của tôi"', type: 'wisdom' },
        { label: 'KẾT QUẢ', text: 'Thấy vậy => Nhàm chán => Ly tham => Giải thoát', type: 'result' }
      ],
      fullText: `${currentSubject}... này các Tỳ-kheo là vô thường. Cái gì vô thường là khổ. Cái gì khổ là vô ngã. Cái gì vô ngã cần phải như thật quán với chánh trí tuệ là: "Cái này không phải của tôi, cái này không phải là tôi, cái này không phải tự ngã của tôi".\n\nThấy vậy, vị Đa văn Thánh đệ tử nhàm chán đối với ${currentSubject}. Do nhàm chán, vị ấy ly tham. Do ly tham, vị ấy giải thoát. Trong sự giải thoát, khởi lên trí biết rằng: "Ta đã giải thoát". Vị ấy biết rõ: "Sanh đã tận, Phạm hạnh đã thành, những việc nên làm đã làm, không còn trở lui trạng thái này nữa".`
    },
    ba_thoi: {
      id: 'ba_thoi',
      title: '2. Quán Ba Thời (Quá khứ - Vị lai - Hiện tại)',
      icon: Clock,
      color: 'indigo',
      description: 'Không tiếc nuối quá khứ, không hoan hỷ tương lai',
      flow: [
        { label: 'QUÁ KHỨ', text: `${currentSubject} quá khứ là Vô thường/Khổ/Vô ngã`, type: 'input' },
        { label: 'THÁI ĐỘ', text: '=> Không tiếc nuối', type: 'result' },
        { label: 'TƯƠNG LAI', text: `${currentSubject} tương lai là Vô thường/Khổ/Vô ngã`, type: 'input' },
        { label: 'THÁI ĐỘ', text: '=> Không hoan hỷ', type: 'result' },
        { label: 'HIỆN TẠI', text: `${currentSubject} hiện tại là Vô thường/Khổ/Vô ngã`, type: 'input' },
        { label: 'THỰC HÀNH', text: '=> Nhàm chán, Ly tham, Đoạn diệt', type: 'wisdom' }
      ],
      fullText: `${currentSubject}, này các Tỷ-kheo, là vô thường [và Khổ, và Vô ngã], kể cả quá khứ và vị lai, còn nói gì (${currentSubject}) hiện tại. Thấy vậy, này các Tỷ-kheo, vị Ða văn Thánh đệ tử không tiếc nuối đối với ${currentSubject} quá khứ, không còn hoan hỷ đối với ${currentSubject} tương lai, đối với ${currentSubject} hiện tại; đã thực hành sự nhàm chán, ly tham, đoạn diệt.`
    },
    ua_thich: {
      id: 'ua_thich',
      title: '3. Ưa Thích & Khổ Đau',
      icon: Heart,
      color: 'rose',
      description: 'Hệ quả tất yếu của sự yêu thích đối tượng',
      flow: [
        { label: 'NHÂN', text: `Ai ưa thích ${currentSubject}`, type: 'input' },
        { label: 'QUY LUẬT', text: `Người ấy ưa thích KHỔ`, type: 'danger' },
        { label: 'QUẢ', text: `Ai ưa thích Khổ => Không thoát khỏi Khổ`, type: 'danger' },
        { label: 'NGƯỢC LẠI', text: `Ai không ưa thích ${currentSubject} => Thoát khỏi Khổ`, type: 'wisdom' }
      ],
      fullText: `Ai ưa thích ${currentSubject}, này các Tỷ-kheo, người ấy ưa thích khổ. Ai ưa thích khổ, Ta nói người ấy không thoát khỏi khổ.\n\nAi không ưa thích ${currentSubject}, này các Tỷ-kheo, người ấy không ưa thích khổ. Ai không ưa thích khổ, Ta nói người ấy thoát khỏi khổ.`
    },
    sanh_khoi: {
      id: 'sanh_khoi',
      title: '4. Sự Sanh Khởi (Arising)',
      icon: Anchor,
      color: 'orange',
      description: 'Sự xuất hiện của giác quan chính là sự xuất hiện của khổ',
      flow: [
        { label: 'HIỆN TƯỢNG', text: `${currentSubject} sanh khởi, chỉ trú, xuất hiện`, type: 'input' },
        { label: 'ĐỒNG NGHĨA VỚI', text: `Là KHỔ sanh khởi`, type: 'danger' },
        { label: 'ĐỒNG NGHĨA VỚI', text: `Là TẬT BỆNH chỉ trú`, type: 'danger' },
        { label: 'ĐỒNG NGHĨA VỚI', text: `Là GIÀ CHẾT xuất hiện`, type: 'danger' },
        { label: 'KẾT LUẬN', text: `${currentSubject} đoạn diệt => Khổ đoạn diệt`, type: 'wisdom' }
      ],
      fullText: `Này các Tỷ-kheo, ${currentSubject} sanh khởi, chỉ trú, xuất sanh, xuất hiện là khổ sanh khởi, tật bệnh chỉ trú, già chết xuất hiện.\n\nNày các Tỷ-kheo, ${currentSubject} đoạn diệt, vắng lặng, biến mất là khổ đoạn diệt, tật bệnh vắng lặng, già chết biến mất.`
    },
    khong_tu_luong: {
      id: 'khong_tu_luong',
      title: '5. Không Tư Lường (Not Conceiving)',
      icon: Scale,
      color: 'violet',
      description: 'Con đường nhổ lên sự chấp thủ',
      flow: [
        { label: 'THỰC HÀNH', text: `Không tư lường ${currentSubject}`, type: 'wisdom' },
        { label: 'HỆ QUẢ', text: `Không tư lường đối tượng ấy là "Của Ta"`, type: 'wisdom' },
        { label: 'KIỂM TRA', text: `${currentSubject} Vô thường -> Khổ -> Vô ngã`, type: 'process' },
        { label: 'CÂU HỎI', text: `Có hợp lý chăng khi quán: "Cái này là tôi/của tôi"?`, type: 'input' },
        { label: 'TRẢ LỜI', text: `Thưa không, bạch Thế Tôn`, type: 'result' }
      ],
      fullText: `Con đường thích hợp đưa đến nhổ lên tất cả tư lường:\n\nKhông từ lường ${currentSubject} -> không từ lường các đối tượng ấy là của ta.\n\nQuán các đối tượng trên là vô thường => là khổ => vô thường và khổ => vô ngã => có hợp lý chăng khi quán cái ấy: "Cái này là của tôi, cái này là tôi, cái này là tự ngã của tôi"?`
    },
    phai_bi: {
      id: 'phai_bi',
      title: '6. Quy Luật Tất Yếu (Phải Bị...)',
      icon: RotateCcw,
      color: 'slate',
      description: 'Bản chất không thể tránh khỏi của pháp hữu vi',
      flow: [
        { label: 'BẢN CHẤT', text: `${currentSubject} phải bị SANH`, type: 'input' },
        { label: 'BẢN CHẤT', text: `${currentSubject} phải bị GIÀ / BỆNH / CHẾT`, type: 'input' },
        { label: 'BẢN CHẤT', text: `${currentSubject} phải bị SẦU / BI / KHỔ / ƯU / NÃO`, type: 'input' },
        { label: 'PHẢN ỨNG', text: `Thấy vậy => Nhàm chán => Ly tham`, type: 'process' },
        { label: 'GIẢI THOÁT', text: `Đoạn diệt, Tiêu diệt, Tập khởi, Đoạn diệt`, type: 'result' }
      ],
      fullText: `${currentSubject}, này các Tỷ-kheo, phải bị sanh. ${currentSenseData.consciousness} phải bị sanh. ${currentSenseData.contact} phải bị sanh. Do duyên ${currentSenseData.contact} khởi lên cảm thọ gì... cảm thọ ấy phải bị sanh…\n\n${currentSubject}, này các Tỷ-kheo, phải bị già... phải bị bệnh... phải bị chết... phải bị sầu... phải bị phiền não... phải bị đoạn tận... phải bị tiêu diệt... phải bị tập khởi... phải bị đoạn diệt.\n\nThấy vậy, nhàm chán => ly tham => giải thoát.`
    },
    vi_ngot: {
      id: 'vi_ngot',
      title: '7. Vị Ngọt - Nguy Hiểm - Xuất Ly',
      icon: ShieldAlert,
      color: 'amber',
      description: 'Phân tích bản chất sự trói buộc và con đường thoát ra',
      flow: [
        { label: 'VỊ NGỌT', text: `Duyên ${currentSubject} khởi lên Lạc hỷ => Chúng sanh tham luyến`, type: 'danger' },
        { label: 'NGUY HIỂM', text: `${currentSubject} vô thường, khổ, biến hoại => Chúng sanh nhàm chán`, type: 'process' },
        { label: 'XUẤT LY', text: `Nhiếp phục, đoạn trừ dục tham => Chúng sanh xuất ly`, type: 'wisdom' }
      ],
      fullText: `"Do duyên với ${currentSubject}, khởi lên lạc hỷ gì, đấy là vị ngọt của ${currentSubject}. ${currentSubject} vô thường, khổ, chịu sự biến hoại, đấy là nguy hiểm của ${currentSubject}. Nhiếp phục dục tham, đoạn trừ dục tham đối với ${currentSubject} là xuất ly của ${currentSubject}…\n\nNếu ${currentSubject} không có vị ngọt, này các Tỷ-kheo, chúng sanh có thể không tham luyến ${currentSubject}. Và vì rằng, này các Tỷ-kheo, ${currentSubject} có vị ngọt nên chúng sanh tham luyến ${currentSubject}.\n\nNếu ${currentSubject} không có nguy hiểm, này các Tỷ-kheo, thời chúng sanh có thể không nhàm chán đối với ${currentSubject}. Và vì rằng ${currentSubject} có nguy hiểm nên chúng sanh nhàm chán đối với ${currentSubject}.\n\nNếu ${currentSubject} không có xuất ly, này các Tỷ-kheo, thời chúng sanh không có thể xuất ly khỏi ${currentSubject}. Và vì rằng ${currentSubject} có xuất ly nên chúng sanh có xuất ly khỏi ${currentSubject}.`
    },
    lua: {
      id: 'lua',
      title: '8. Lửa (Adittapariyaya)',
      icon: Flame,
      color: 'red',
      description: 'Tất cả đang bốc cháy bởi Tham, Sân, Si',
      flow: [
        { label: 'NHẬN THỨC', text: `Tất cả (${currentSenseData.internal} + ${currentSenseData.external} + Thức + Xúc + Thọ) đang bốc cháy`, type: 'input' },
        { label: 'NGUYÊN NHÂN', text: 'Cháy bởi: Lửa Tham, Lửa Sân, Lửa Si', type: 'danger' },
        { label: 'HỆ QUẢ KHỔ', text: 'Cháy bởi: Sanh, Già, Chết, Sầu, Bi, Khổ, Ưu, Não', type: 'danger' },
        { label: 'GIẢI PHÁP', text: 'Thấy vậy => Nhàm chán => Ly tham => Giải thoát', type: 'wisdom' }
      ],
      fullText: `${currentSenseData.internal}, này các Tỷ-kheo, bị bốc cháy. ${currentSenseData.external} bị bốc cháy. ${currentSenseData.consciousness} bị bốc cháy. ${currentSenseData.contact} bị bốc cháy. Do duyên ${currentSenseData.contact} khởi lên cảm thọ gì, lạc, khổ hay bất khổ bất lạc; cảm thọ ấy bị bốc cháy.\n\nBị bốc cháy bởi cái gì? Bị bốc cháy bởi lửa tham, lửa sân, lửa si. Ta nói rằng bị bốc cháy bởi sanh, già, chết, sầu, bi, khổ, ưu, não…`
    },
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dhamma-formula-order');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        setFormulaOrder(parsed);
      } catch (e) {
        setFormulaOrder(Object.keys(formulas));
      }
    } else {
      setFormulaOrder(Object.keys(formulas));
    }

    const savedSidebarWidth = localStorage.getItem('dhamma-sidebar-width');
    if (savedSidebarWidth) {
      const width = parseInt(savedSidebarWidth, 10);
      setSidebarWidth(Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, width)));
    }

    const savedScriptureWidth = localStorage.getItem('dhamma-scripture-width');
    if (savedScriptureWidth) {
      const width = parseInt(savedScriptureWidth, 10);
      setScriptureWidth(Math.max(MIN_SCRIPTURE_WIDTH, Math.min(MAX_SCRIPTURE_WIDTH, width)));
    }
  }, []);

  // Save functions
  const saveOrder = (newOrder) => {
    localStorage.setItem('dhamma-formula-order', JSON.stringify(newOrder));
  };

  const saveSidebarWidth = (width) => {
    localStorage.setItem('dhamma-sidebar-width', width.toString());
  };

  const saveScriptureWidth = (width) => {
    localStorage.setItem('dhamma-scripture-width', width.toString());
  };

  // Resize handlers
  const handleSidebarMouseDown = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
  };

  const handleScriptureMouseDown = (e) => {
    e.preventDefault();
    setIsResizingScripture(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingSidebar && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        const remainingWidth = containerRect.width - newWidth - scriptureWidth;
        
        if (newWidth >= MIN_SIDEBAR_WIDTH && 
            newWidth <= MAX_SIDEBAR_WIDTH && 
            remainingWidth >= MIN_FLOWCHART_WIDTH) {
          setSidebarWidth(newWidth);
        }
      }

      if (isResizingScripture && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = containerRect.right - e.clientX;
        const remainingWidth = containerRect.width - sidebarWidth - newWidth;
        
        if (newWidth >= MIN_SCRIPTURE_WIDTH && 
            newWidth <= MAX_SCRIPTURE_WIDTH && 
            remainingWidth >= MIN_FLOWCHART_WIDTH) {
          setScriptureWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      if (isResizingSidebar) {
        setIsResizingSidebar(false);
        saveSidebarWidth(sidebarWidth);
      }
      if (isResizingScripture) {
        setIsResizingScripture(false);
        saveScriptureWidth(scriptureWidth);
      }
    };

    if (isResizingSidebar || isResizingScripture) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, isResizingScripture, sidebarWidth, scriptureWidth]);

  // Drag handlers (giữ nguyên logic)
  const handleDragStart = (e, formulaId) => {
    setDraggedItem(formulaId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, formulaId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedItem !== formulaId) {
      setDragOverItem(formulaId);
    }
  };

  const handleDrop = (e, targetFormulaId) => {
    e.preventDefault();
    if (draggedItem === targetFormulaId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newOrder = [...formulaOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetFormulaId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    setFormulaOrder(newOrder);
    saveOrder(newOrder);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const currentFormula = formulas[selectedFormula];

  // KINDLE STYLE: High Contrast, Borders, No Colors
  const getNodeStyles = (type) => {
    switch(type) {
      case 'input': return 'bg-white border text-black border-black';
      case 'process': return 'bg-white border-2 border-dotted border-gray-400 text-black italic';
      case 'danger': return 'bg-white border-4 border-black text-black font-bold';
      case 'wisdom': return 'bg-black text-white border border-black font-medium';
      case 'result': return 'bg-gray-200 border-2 border-black text-black font-bold shadow-[4px_4px_0_0_black]';
      default: return 'bg-white border border-black';
    }
  };

  const orderedFormulas = formulaOrder.map(id => formulas[id]).filter(Boolean);

  return (
    <>
      {/* Controls in header - Kindle Style Buttons */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-center p-4 border-b ">
        <div className="flex items-center overflow-hidden  rounded-sm shadow-sm">
          <button
            onClick={() => setTargetType('internal')}
            className={`px-6 py-2 text-sm font-bold uppercase transition-all ${
              targetType === 'internal' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Giác Quan
          </button>
          <div className="w-px h-full bg-black"></div>
          <button
            onClick={() => setTargetType('external')}
            className={`px-6 py-2 text-sm font-bold uppercase transition-all ${
              targetType === 'external' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Cảnh
          </button>
        </div>

        <div className="flex gap-1 flex-wrap justify-center   rounded-sm overflow-hidden shadow-sm">
          {Object.values(senses).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSense(s.id)}
              className={`flex items-center gap-2 px-4 py-2 border-r border-black last:border-r-0 transition-all whitespace-nowrap text-sm font-bold ${
                selectedSense === s.id 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <s.icon size={16} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3-column layout */}
      <div ref={containerRef} className="flex flex-col lg:flex-row flex-1 overflow-hidden w-full relative bg-white text-black font-sans">
        
        {/* Sidebar Column */}
        <div 
          className="bg-white border-r border-black flex-none flex flex-col overflow-hidden relative"
          style={{ 
            width: window.innerWidth >= 1024 ? `${sidebarWidth}px` : '100%',
            minWidth: window.innerWidth >= 1024 ? `${MIN_SIDEBAR_WIDTH}px` : 'auto',
            maxWidth: window.innerWidth >= 1024 ? `${MAX_SIDEBAR_WIDTH}px` : 'none'
          }}
        >
          <div className="p-4 bg-gray-50 border-b border-black flex-none">
            <h3 className="text-xs font-bold text-black uppercase tracking-widest text-center">Danh mục quán chiếu</h3>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {orderedFormulas.map((f) => (
              <div
                key={f.id}
                draggable
                onDragStart={(e) => handleDragStart(e, f.id)}
                onDragOver={(e) => handleDragOver(e, f.id)}
                onDrop={(e) => handleDrop(e, f.id)}
                onDragEnd={handleDragEnd}
                className={`transition-all border-b border-black last:border-b-0 ${
                  draggedItem === f.id ? 'opacity-40' : ''
                } ${
                  dragOverItem === f.id ? 'bg-gray-200' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedFormula(f.id)}
                  className={`w-full text-left p-4 transition-all flex items-start gap-4 group cursor-pointer ${
                    selectedFormula === f.id
                      ? `bg-black text-white`
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  <div className={`p-1 mt-1 flex-shrink-0 cursor-grab active:cursor-grabbing ${selectedFormula === f.id ? 'text-white' : 'text-gray-400 hover:text-black'}`}>
                    <GripVertical size={16} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm uppercase">{f.title}</div>
                    <div className={`text-xs mt-1 italic ${selectedFormula === f.id ? 'text-gray-300' : 'text-gray-600'}`}>
                        {f.description}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Resize handle for sidebar */}
          {window.innerWidth >= 1024 && (
            <div 
              className={`w-1 bg-black opacity-0 hover:opacity-20 cursor-col-resize absolute top-0 bottom-0 z-20 ${isResizingSidebar ? 'opacity-20' : ''}`}
              style={{ right: '0px' }}
              onMouseDown={handleSidebarMouseDown}
            />
          )}
        </div>

        {/* Flowchart Column */}
        <div 
          className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-8 relative bg-white"
          style={{ 
            minWidth: window.innerWidth >= 1024 ? `${MIN_FLOWCHART_WIDTH}px` : 'auto'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4 border-b-2 border-black pb-4">
              <h2 className="text-xl font-bold text-black uppercase tracking-wide">
                {currentFormula.title}
              </h2>
              <div className="flex items-center gap-2 border border-black px-3 py-1 rounded-sm bg-gray-50">
                <span className="text-xs font-bold uppercase text-gray-500">Đối tượng:</span>
                <span className="text-sm font-bold font-mono uppercase">
                  {currentSubject}
                </span>
              </div>
            </div>

            <div className="relative pl-4 space-y-6">
              {/* Dotted Line */}
              <div className="absolute left-[34px] top-6 bottom-6 w-0.5 border-l-2 border-dotted border-black -z-0"></div>

              {currentFormula.flow.map((step, index) => (
                <div key={index} className="relative z-10 flex gap-6 items-start">
                  <div className={`flex-none w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold text-lg bg-white z-10 ${
                     step.type === 'result' ? 'bg-black text-white' : 'text-black'
                  }`}>
                    {index + 1}
                  </div>

                  <div className={`flex-1 p-5 rounded-sm transition-all ${getNodeStyles(step.type)}`}>
                    <div className="text-[10px] font-bold uppercase mb-2 tracking-widest border-b border-current pb-1 w-fit opacity-70">
                        {step.label}
                    </div>
                    <div className="font-medium text-lg leading-relaxed">{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scripture Column */}
        <div 
          className="bg-gray-50 border-l border-black flex flex-col flex-shrink-0 relative z-10"
          style={{ 
            width: window.innerWidth >= 1024 ? `${scriptureWidth}px` : '100%',
            minWidth: window.innerWidth >= 1024 ? `${MIN_SCRIPTURE_WIDTH}px` : 'auto',
            maxWidth: window.innerWidth >= 1024 ? `${MAX_SCRIPTURE_WIDTH}px` : 'none'
          }}
        >
          {/* Resize handle for scripture column */}
          {window.innerWidth >= 1024 && (
            <div 
              className={`w-1 bg-black opacity-0 hover:opacity-20 cursor-col-resize absolute top-0 bottom-0 z-20 ${isResizingScripture ? 'opacity-20' : ''}`}
              style={{ left: '0px' }}
              onMouseDown={handleScriptureMouseDown}
            />
          )}
          
          <div className="px-6 py-5 border-b border-black flex-none">
            <div className="flex items-center justify-center gap-2 text-black">
              <BookOpen size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">Kinh Văn Tương Ứng</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-8 bg-white">
            <div className="text-lg leading-loose text-justify text-black whitespace-pre-line font-sans">
              {currentFormula.fullText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwelveAyatana;