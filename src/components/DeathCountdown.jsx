import React, { useState, useEffect } from "react";
import {
  Skull,
  Clock,
  Utensils,
  Calendar,
  Hourglass,
  Battery,
  Activity,
  AlertTriangle,
} from "lucide-react";

const DeathCountdown = () => {
  const [birthDate, setBirthDate] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState(75); // Tuổi thọ trung bình mặc định
  const [percentage, setPercentage] = useState(100);
  const [stats, setStats] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalMeals: 0,
  });

  // Load ngày sinh từ localStorage
  useEffect(() => {
    const savedBirthDate = localStorage.getItem("dhamma-birth-date");
    if (savedBirthDate) {
      setBirthDate(savedBirthDate);
    }
  }, []);

  useEffect(() => {
    if (!birthDate) return;

    localStorage.setItem("dhamma-birth-date", birthDate);

    const calculateTime = () => {
      const start = new Date(birthDate).getTime();
      const end = new Date(birthDate);
      end.setFullYear(end.getFullYear() + lifeExpectancy);

      const now = new Date().getTime();
      const totalLifespan = end.getTime() - start;
      const remaining = end.getTime() - now;

      if (remaining <= 0) {
        setPercentage(0);
        setStats({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalMeals: 0,
        });
        return;
      }

      // Thanh năng lượng
      setPercentage((remaining / totalLifespan) * 100);

      // Tính toán chi tiết thời gian còn lại (Duration)
      const diffDate = new Date(remaining); // Đây là khoảng chênh lệch
      // Lưu ý: Tính toán duration chính xác cần trừ mốc epoch 1970
      // Cách đơn giản hơn:
      let delta = Math.abs(remaining) / 1000;

      const years = Math.floor(delta / (365.25 * 24 * 3600));
      delta -= years * 365.25 * 24 * 3600;

      const days = Math.floor(delta / (24 * 3600));
      delta -= days * 24 * 3600;

      const hours = Math.floor(delta / 3600);
      delta -= hours * 3600;

      const minutes = Math.floor(delta / 60) % 60;

      const seconds = Math.floor(delta % 60);

      // Số liệu tổng quan
      const totalDaysLeft = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const totalMeals = totalDaysLeft * 3;

      setStats({
        years,
        days,
        hours,
        minutes,
        seconds,
        totalDays: totalDaysLeft,
        totalMeals,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [birthDate, lifeExpectancy]);

  const handleDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const setImperamenceMode = () => {
    if (!birthDate) {
      alert("Vui lòng nhập ngày sinh trước.");
      return;
    }
    const birth = new Date(birthDate);
    const now = new Date();
    const currentAge = now.getFullYear() - birth.getFullYear();

    // Random tuổi thọ từ hiện tại+1 năm đến 90 tuổi
    // Mô phỏng sự vô thường: cái chết có thể đến bất cứ lúc nào
    const min = currentAge + 1;
    const max = 90;
    const randomAge = Math.floor(Math.random() * (max - min + 1)) + min;

    setLifeExpectancy(randomAge);
  };

  if (!birthDate) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full text-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-4 rounded-full">
              <Skull size={48} className="text-slate-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">
            Đồng Hồ Sự Chết
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            "Chưa biết ngày mai hay cái chết, cái nào sẽ đến trước."
            <br />
            <span className="text-xs text-slate-400 mt-1 block">
              Hãy nhập ngày sinh để đối diện với sự thật.
            </span>
          </p>

          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Ngày tháng năm sinh
            </label>
            <input
              type="date"
              className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none w-full bg-slate-50"
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-20">
      {/* Header Message */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl text-center space-y-6 border-y-4 border-red-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

        <div className="flex flex-col items-center gap-4 relative z-10">
          <h2 className="text-xl md:text-3xl font-bold leading-relaxed max-w-3xl">
            "Mỗi hơi thở ra là một bước gần hơn đến cái chết.
            <br />
            Bạn đã làm gì cho hành trang tái sanh của mình?"
          </h2>
          <p className="text-slate-400 italic font-lora text-lg">
            "Mỗi bước đi tới của thời gian, là mỗi bước đi lùi của sinh mạng"
          </p>
        </div>

        {/* Background Accents */}
        <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Energy Bar */}
      <div className="bg-white p-4 md:p-4 rounded-2xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
            <Battery
              size={20}
              className={percentage < 20 ? "text-red-500" : "text-slate-400"}
            />
            Năng lượng sống còn lại
          </span>
          <div className="text-right">
            <span
              className={`text-3xl font-bold tabular-nums tracking-tight ${
                percentage < 20 ? "text-red-600" : "text-slate-800"
              }`}
            >
              {percentage.toFixed(7)}%
            </span>
          </div>
        </div>

        <div className="w-full h-10 bg-slate-100 rounded-full overflow-hidden relative shadow-inner border border-slate-200">
          <div
            className={`h-full transition-all duration-1000 linear ${
              percentage < 20
                ? "bg-gradient-to-r from-red-600 to-red-500 animate-pulse"
                : percentage < 50
                ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                : "bg-gradient-to-r from-emerald-600 to-emerald-400"
            }`}
            style={{ width: `${percentage}%` }}
          >
            {/* Liquid Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </div>

        <div className="flex justify-between mt-3 text-xs text-slate-400 items-center">
          <div>
            Ngày sinh: {new Date(birthDate).toLocaleDateString("vi-VN")}
          </div>
          <div className="flex items-center gap-1">
            Điểm kết thúc giả định: {lifeExpectancy} tuổi
            {percentage < 20 && (
              <AlertTriangle size={12} className="text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Main Countdown - Spans full row on mobile, 2 cols on desktop */}
        <div className="col-span-2 bg-slate-800 text-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0"></div>
          <div className="absolute -right-4 -top-4 text-slate-700 opacity-20">
            <Hourglass size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Thời gian còn lại
            </div>
            <div className="flex items-baseline gap-2 md:gap-4 text-center">
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-bold tabular-nums">
                  {stats.years}
                </span>
                <span className="text-[10px] md:text-xs text-slate-500 uppercase">
                  Năm
                </span>
              </div>
              <span className="text-2xl text-slate-600">:</span>
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-bold tabular-nums">
                  {stats.days}
                </span>
                <span className="text-[10px] md:text-xs text-slate-500 uppercase">
                  Ngày
                </span>
              </div>
              <span className="text-2xl text-slate-600">:</span>
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-bold tabular-nums">
                  {stats.hours}
                </span>
                <span className="text-[10px] md:text-xs text-slate-500 uppercase">
                  Giờ
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2 text-slate-400">
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-mono tabular-nums text-slate-300">
                  {stats.minutes}
                </span>
                <span className="text-[10px] uppercase">Phút</span>
              </div>
              <span className="text-sm opacity-50">:</span>
              <div className="flex gap-1 items-baseline">
                <span className="text-xl font-mono tabular-nums text-red-400 w-6 text-center">
                  {stats.seconds}
                </span>
                <span className="text-[10px] uppercase">Giây</span>
              </div>
            </div>
          </div>
        </div>

        <StatCard
          icon={Calendar}
          label="Tổng Ngày Còn Lại"
          value={stats.totalDays}
          color="bg-white border-slate-200 text-slate-700 hover:border-blue-300 transition-colors"
        />

        <StatCard
          icon={Utensils}
          label="Số Bữa Ăn Còn Lại"
          subLabel="(3 bữa/ngày)"
          value={stats.totalMeals}
          color="bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100 transition-colors"
        />
      </div>

      {/* Inputs & Controls */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Ngày sinh
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={handleDateChange}
              className="p-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Tuổi thọ dự kiến
            </label>
            <input
              type="number"
              value={lifeExpectancy}
              onChange={(e) =>
                setLifeExpectancy(parseInt(e.target.value) || 75)
              }
              className="p-2 border border-slate-300 rounded text-sm w-20 bg-white focus:outline-none focus:border-blue-500 text-center"
            />
          </div>
        </div>

        <button
          onClick={setImperamenceMode}
          className="w-full md:w-auto px-5 py-3 bg-white border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
          title="Ngẫu nhiên hóa tuổi thọ để quán vô thường"
        >
          <Skull size={18} />
          Quán Vô Thường (Ngẫu nhiên)
        </button>
      </div>

      <div className="text-center text-xs text-slate-400 pt-8 pb-4 italic">
        "Thực hành Marananussati (Niệm Chết) không phải để bi quan, mà để sống
        trọn vẹn và tỉnh thức."
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, subLabel, value, color }) => (
  <div
    className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center shadow-sm h-full ${color}`}
  >
    <div className="mb-3 opacity-80 bg-white/50 p-3 rounded-full">
      <Icon size={24} />
    </div>
    <div className="text-3xl md:text-4xl font-bold font-mono tracking-tighter tabular-nums mb-1">
      {value.toLocaleString()}
    </div>
    <div className="text-xs font-bold uppercase tracking-wide opacity-80">
      {label}
    </div>
    {subLabel && <div className="text-[10px] opacity-60 mt-1">{subLabel}</div>}
  </div>
);

export default DeathCountdown;
