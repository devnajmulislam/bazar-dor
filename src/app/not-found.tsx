import Link from "next/link";


const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center container mx-auto px-4 py-12">
      <div className="w-full text-center space-y-6 bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
        {/* 404 icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-red-50 text-[#D03739] rounded-full">
          <span className="text-4xl font-extrabold">404</span>
        </div>

        {/* Text content*/}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            পৃষ্ঠাটি পাওয়া যায়নি!
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।
          </p>
        </div>

        {/* Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#009245] hover:bg-[#007a3a] text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;