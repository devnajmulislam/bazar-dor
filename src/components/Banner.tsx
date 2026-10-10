import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="px-4 py-6 max-w-7xl mx-auto">
      <div className="card bg-base-100 border border-base-200 shadow-sm rounded-3xl p-4 md:p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left space-y-4 max-w-xl">
            {/* Date Pill */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
              {date}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral/70 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Action Button */}
            <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-8 rounded-xl font-medium shadow-md transition-all duration-200">
              সব পণ্য দেখুন
            </button>
          </div>

          {/* Right Image Container */}
          <div className="w-full lg:w-auto flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image 
                src="/bazar-hero.png" 
                alt="Bazar Hero Illustration" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;