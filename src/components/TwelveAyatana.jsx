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
    eye: { 
      id: 'eye', label: 'Mắt', icon: Eye, 
      internal: 'Mắt', external: 'Các Sắc', 
      consciousness: 'Nhãn thức', contact: 'Nhãn xúc' 
    },
    ear: { 
      id: 'ear', label: 'Tai', icon: Ear, 
      internal: 'Tai', external: 'Các Tiếng', 
      consciousness: 'Nhĩ thức', contact: 'Nhĩ xúc' 
    },
    nose: { 
      id: 'nose', label: 'Mũi', icon: Wind, 
      internal: 'Mũi', external: 'Các Hương', 
      consciousness: 'Tỷ thức', contact: 'Tỷ xúc' 
    },
    tongue: { 
      id: 'tongue', label: 'Lưỡi', icon: Smile, 
      internal: 'Lưỡi', external: 'Các Vị', 
      consciousness: 'Thiệt thức', contact: 'Thiệt xúc' 
    },
    body: { 
      id: 'body', label: 'Thân', icon: Hand, 
      internal: 'Thân', external: 'Các Xúc', 
      consciousness: 'Thân thức', contact: 'Thân xúc' 
    },
    mind: { 
      id: 'mind', label: 'Ý', icon: Brain, 
      internal: 'Ý', external: 'Các Pháp', 
      consciousness: 'Ý thức', contact: 'Ý xúc' 
    },
  };

  const currentSenseData = senses[selectedSense];
  const currentSubject = targetType === 'internal' ? currentSenseData.internal : currentSenseData.external;

  // Dữ liệu các công thức
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

  // Drag handlers
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

  const getNodeStyles = (type) => {
    switch(type) {
      case 'input': return 'bg-slate-100 border-slate-300 text-slate-700';
      case 'process': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'danger': return 'bg-red-50 border-red-200 text-red-700';
      case 'wisdom': return 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium';
      case 'result': return 'bg-emerald-600 border-emerald-700 text-white shadow-md';
      default: return 'bg-white border-slate-200';
    }
  };

  const orderedFormulas = formulaOrder.map(id => formulas[id]).filter(Boolean);

  return (
    <>
      {/* Controls in header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-center">
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setTargetType('internal')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              targetType === 'internal' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Giác Quan
          </button>
          <button
            onClick={() => setTargetType('external')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              targetType === 'external' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Cảnh
          </button>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto hide-scrollbar max-w-full">
          {Object.values(senses).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSense(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium ${
                selectedSense === s.id 
                  ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              <s.icon size={16} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3-column layout */}
      <div ref={containerRef} className="flex flex-col lg:flex-row flex-1 overflow-hidden w-full relative">
        
        {/* Sidebar Column */}
        <div 
          className="bg-white border-r border-slate-200 flex-none flex flex-col overflow-hidden relative"
          style={{ 
            width: window.innerWidth >= 1024 ? `${sidebarWidth}px` : '100%',
            minWidth: window.innerWidth >= 1024 ? `${MIN_SIDEBAR_WIDTH}px` : 'auto',
            maxWidth: window.innerWidth >= 1024 ? `${MAX_SIDEBAR_WIDTH}px` : 'none'
          }}
        >
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex-none">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chọn Công Thức Quán</h3>
            <p className="text-xs text-slate-400 mt-1">Kéo thả để sắp xếp</p>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-1">
            {orderedFormulas.map((f) => (
              <div
                key={f.id}
                draggable
                onDragStart={(e) => handleDragStart(e, f.id)}
                onDragOver={(e) => handleDragOver(e, f.id)}
                onDrop={(e) => handleDrop(e, f.id)}
                onDragEnd={handleDragEnd}
                className={`transition-all ${
                  draggedItem === f.id ? 'opacity-40 scale-95' : ''
                } ${
                  dragOverItem === f.id ? 'border-t-2 border-blue-500' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedFormula(f.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 group cursor-pointer ${
                    selectedFormula === f.id
                      ? `bg-${f.color}-50 border-${f.color}-200 ring-1 ring-${f.color}-300`
                      : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="p-1 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
                    <GripVertical size={16} />
                  </div>
                  
                  <div className={`p-2 rounded-md mt-1 flex-shrink-0 ${selectedFormula === f.id ? `bg-${f.color}-100 text-${f.color}-600` : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    <f.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-semibold text-sm ${selectedFormula === f.id ? `text-${f.color}-900` : 'text-slate-700'}`}>{f.title}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-2">{f.description}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Resize handle for sidebar */}
          {window.innerWidth >= 1024 && (
            <div 
              className={`resize-handle ${isResizingSidebar ? 'active' : ''}`}
              style={{ right: '-3px' }}
              onMouseDown={handleSidebarMouseDown}
            />
          )}
        </div>

        {/* Flowchart Column */}
        <div 
          className="flex-1 overflow-y-auto hide-scrollbar p-4 md:p-8 border-r border-slate-200"
          style={{ 
            minWidth: window.innerWidth >= 1024 ? `${MIN_FLOWCHART_WIDTH}px` : 'auto'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-bold text-slate-700 border-l-4 border-blue-500 pl-3">
                Sơ Đồ: {currentFormula.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-slate-400">Đối tượng quán:</span>
                <span className={`text-sm font-mono px-3 py-1 rounded border ${
                  targetType === 'internal' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                }`}>
                  {currentSubject}
                </span>
              </div>
            </div>

            <div className="relative pl-4 md:pl-0 space-y-4 md:space-y-6">
              <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200 -z-0 hidden md:block" style={{ left: '1.75rem' }}></div>

              {currentFormula.flow.map((step, index) => (
                <div key={index} className="relative z-10 flex gap-4 items-start group">
                  <div className={`flex-none w-14 h-14 rounded-full border-4 border-white shadow-sm flex items-center justify-center font-bold text-lg transition-colors ${
                     step.type === 'result' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>

                  <div className={`flex-1 p-4 rounded-xl border shadow-sm transition-all hover:shadow-md ${getNodeStyles(step.type)}`}>
                    <div className="text-xs font-bold opacity-60 uppercase mb-1 tracking-wider">{step.label}</div>
                    <div className="font-medium text-lg leading-snug">{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scripture Column */}
        <div 
          className="bg-slate-800 flex flex-col shadow-lg relative flex-shrink-0"
          style={{ 
            width: window.innerWidth >= 1024 ? `${scriptureWidth}px` : '100%',
            minWidth: window.innerWidth >= 1024 ? `${MIN_SCRIPTURE_WIDTH}px` : 'auto',
            maxWidth: window.innerWidth >= 1024 ? `${MAX_SCRIPTURE_WIDTH}px` : 'none'
          }}
        >
          {/* Resize handle for scripture column */}
          {window.innerWidth >= 1024 && (
            <div 
              className={`resize-handle ${isResizingScripture ? 'active' : ''}`}
              style={{ left: '-3px' }}
              onMouseDown={handleScriptureMouseDown}
            />
          )}
          
          <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-700 flex-none">
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen size={20} className="text-amber-500" />
              <span className="font-bold text-base uppercase tracking-wider">Kinh Văn Tương Ứng</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-8">
            <div className="font-lora text-base md:text-lg leading-relaxed text-slate-300 whitespace-pre-line selection:bg-amber-900 selection:text-amber-100">
              {currentFormula.fullText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwelveAyatana;