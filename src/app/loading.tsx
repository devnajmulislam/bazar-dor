const LoadingPage = () => {
    return (
        <div className="space-y-10 md:space-y-14 pb-16 animate-pulse">
            {/* Marquee Skeleton */}
            <div className="h-10 bg-gray-200 w-full shadow-sm flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    আজকের বাজারের সর্বশেষ আপডেট লোড হচ্ছে...
                </span>
            </div>

            {/* Banner Skeleton */}
            <div className="container mx-auto px-4">
                <div className="h-[240px] md:h-[320px] bg-gray-200 rounded-2xl w-full flex items-center justify-center p-6 text-center">
                    <div>
                        <div className="h-6 bg-gray-300 w-48 mx-auto rounded mb-3" />
                        <p className="text-gray-500 text-sm font-medium">তথ্য লোড করা হচ্ছে, অনুগ্রহ করে একটু অপেক্ষা করুন...</p>
                    </div>
                </div>
            </div>

            {/* আজ দাম বেড়েছে - Top 6 Risers Skeleton */}
            <div className="container mx-auto px-4">
                <div className="h-7 bg-gray-200 w-48 rounded mb-4 md:mb-6 flex items-center px-2">
                    <span className="text-sm font-bold text-gray-600">▲ আজ দাম বেড়েছে</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-36 bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <div className="h-5 bg-gray-200 w-1/3 rounded" />
                                <div className="h-5 bg-gray-200 w-1/4 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 w-3/4 rounded" />
                                <div className="h-4 bg-gray-200 w-1/2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* আজ দাম কমেছে - Top 6 Fallers Skeleton */}
            <div className="container mx-auto px-4">
                <div className="h-7 bg-gray-200 w-48 rounded mb-4 md:mb-6 flex items-center px-2">
                    <span className="text-sm font-bold text-gray-600">▼ আজ দাম কমেছে</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-36 bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <div className="h-5 bg-gray-200 w-1/3 rounded" />
                                <div className="h-5 bg-gray-200 w-1/4 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 w-3/4 rounded" />
                                <div className="h-4 bg-gray-200 w-1/2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* সব পণ্য - All Products Skeleton */}
            <div className="container mx-auto px-4">
                <div className="mb-4 md:mb-6 space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-700">সব পণ্য</h2>
                    <p className="text-sm text-gray-400">পণ্য তালিকা লোড হচ্ছে...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="h-36 bg-gray-100 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <div className="h-5 bg-gray-200 w-1/3 rounded" />
                                <div className="h-5 bg-gray-200 w-1/4 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 w-3/4 rounded" />
                                <div className="h-4 bg-gray-200 w-1/2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;