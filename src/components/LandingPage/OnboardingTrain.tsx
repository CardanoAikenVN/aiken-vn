import React from 'react';

const OnboardingTrain: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#FFF79A] text-[#066C78] py-20 overflow-hidden border-t-4 border-b-4 border-white"
      aria-labelledby="journey-heading"
    >
      {/* Background scenery hints */}
      <div className="absolute top-10 left-20 text-[#066C78] opacity-20" aria-hidden="true">
        <div className="w-16 h-8 bg-current pixel-shadow"></div>
      </div>
      <div className="absolute top-24 right-40 text-[#066C78] opacity-20" aria-hidden="true">
        <div className="w-24 h-12 bg-current pixel-shadow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2
          id="journey-heading"
          className="text-3xl sm:text-4xl md:text-6xl text-center text-[#5D5FEF] text-shadow-retro mb-4 leading-tight"
        >
          HÀNH TRÌNH<br />HỌC AIKEN
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="font-bold text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
            Tham gia hành trình học Aiken từ cơ bản đến nâng cao, xây dựng smart contracts trên Cardano, và kết nối với cộng đồng developers Việt Nam.
          </p>
          <div
            className="inline-block bg-white/50 px-4 py-2 rounded text-sm font-mono mb-8 animate-pulse-slow"
            role="status"
            aria-live="polite"
          >
            <span role="img" aria-label="Tên lửa">🚀</span> Chương trình đang được cập nhật liên tục
          </div>

          <div className="flex justify-center">
            <a
              href="/docs/moi-truong"
              className="inline-block focus:outline-none focus:ring-4 focus:ring-[#066C78] focus:ring-offset-2 focus:ring-offset-[#FFF79A] rounded-full"
              aria-label="Khám phá chương trình học Aiken"
            >
              <button className="bg-[#C6A8FF] text-white px-6 md:px-8 py-3 rounded-full border-2 border-[#066C78] font-['Press_Start_2P'] text-xs hover:bg-[#b08bf8] hover:scale-105 pixel-shadow transition-all active:translate-y-1 focus:outline-none">
                Khám Phá Ngay
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Train Animation Container */}
      <div className="absolute bottom-0 w-full h-24 overflow-hidden border-t-2 border-[#066C78]" aria-hidden="true" role="presentation">
        {/* Track */}
        <div className="absolute bottom-2 w-full h-4 bg-gray-400 border-y-2 border-dashed border-gray-600"></div>

        {/* Moving Train */}
        <div className="absolute bottom-6 flex animate-train w-[200%] gap-1">
          {/* Locomotive */}
          <div className="w-32 h-20 bg-[#5D5FEF] border-4 border-black relative">
            <div className="absolute bottom-0 -right-2 w-4 h-4 bg-gray-800 rounded-full animate-ping"></div>
            <div className="w-8 h-8 bg-blue-200 border-2 border-black m-2"></div>
            <div className="absolute -top-4 right-2 w-6 h-8 bg-black"></div>
          </div>
          {/* Cars */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-28 h-16 bg-[#7B7DFF] border-4 border-black mt-4 flex items-center justify-center relative">
              <div className="w-20 h-8 bg-blue-200 border-2 border-black opacity-80"></div>
              {/* Wheels */}
              <div className="absolute -bottom-3 left-2 w-6 h-6 bg-black rounded-full border-2 border-gray-500 animate-spin"></div>
              <div className="absolute -bottom-3 right-2 w-6 h-6 bg-black rounded-full border-2 border-gray-500 animate-spin"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingTrain;
