import Link from "next/link";
import { notFound } from "next/navigation"; // ১. notFound امপোর্ট করুন

// Helper function to convert English digits to Bengali digits
const toBengaliNumber = (num) => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((char) =>
      char >= "0" && char <= "9" ? bengaliDigits[parseInt(char)] : char,
    )
    .join("");
};

const ProductDetailPage = async ({ params }) => {
  const { productId } = await params;

  // Fetch product details from API
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
  );
  const data = await res.json();

  // ২. || data[0] ফলব্যাকটি সরিয়ে ফেলুন, যাতে না পেলে undefined থাকে
  const product = Array.isArray(data)
    ? data.find((p) => String(p.id) === String(productId))
    : data;

  // ৩. পণ্য না থাকলে সরাসরি notFound() কল করুন
 if (!product || !product.id || !product.today) {
    notFound();
  }

  // Calculate Summary Stats from markets
  const markets = product.markets || [];
  let overallMin =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : 0;
  let overallMax =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : 0;

  // Find market names for min and max
  const minMarketObj = markets.find((m) => m.min === overallMin) || markets[0];
  const maxMarketObj = markets.find((m) => m.max === overallMax) || markets[0];

  // Change direction text & styling
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const changeColor = isUp
    ? "text-error"
    : isDown
      ? "text-success"
      : "text-warning";
  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  // Price difference description
  const diffAmount = Math.abs(product.today - product.yesterday);
  const comparisonText = isUp
    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(diffAmount)} টাকা`
    : isDown
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(diffAmount)} টাকা`
      : `গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে`;

  return (
    <div className="min-h-screen bg-base-200/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs text-base-content/70">
          <ul>
            <li>
              <Link href="/">হোম</Link>
            </li>
            <li>
              <Link href={`/category/${product.category}`}>
                {product.categoryNameBn}
              </Link>
            </li>
            <li className="text-base-content font-medium">{product.nameBn}</li>
          </ul>
        </div>

        {/* Main Product Header Card */}
        <div className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left: Icon & Details */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-base-200 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                {product.image || product.categoryIcon || "📦"}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                  {product.nameBn}
                </h1>
                <p className="text-sm text-base-content/60 mt-1">
                  প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "litre"
                      ? "লিটার"
                      : "হালি"}{" "}
                  · {product.categoryNameBn}
                </p>
                <p
                  className={`text-sm font-medium mt-2 flex items-center gap-1 ${changeColor}`}
                >
                  <span>{changeIcon}</span>
                  <span>{comparisonText}</span>
                </p>
              </div>
            </div>

            {/* Right: Today's Price Badge */}
            <div className="bg-base-200/70 border border-base-300 rounded-2xl p-4 text-center min-w-[140px] w-full md:w-auto">
              <span className="text-xs text-base-content/60 block uppercase tracking-wider font-semibold">
                আজকের দাম
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-base-content my-1">
                {toBengaliNumber(product.today)}
              </div>
              <div className="text-xs text-base-content/70">
                টাকা /{" "}
                {product.unit === "kg"
                  ? "কেজি"
                  : product.unit === "litre"
                    ? "লিটার"
                    : "হালি"}
              </div>
              <div
                className={`text-xs font-bold mt-1 flex items-center justify-center gap-1 ${changeColor}`}
              >
                <span>{changeIcon}</span>
                <span>
                  {toBengaliNumber(Math.abs(product.change?.pct || 0))}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary Section (দামের সারসংক্ষেপ) */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-base-content">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Price Card */}
            <div className="card bg-base-100 border border-base-300 shadow-sm p-5 rounded-2xl">
              <span className="text-xs text-base-content/60 font-medium">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-success mt-1">
                {toBengaliNumber(overallMin)}{" "}
                <span className="text-sm font-normal text-base-content/70">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-base-content/60 mt-2 truncate">
                সবচেয়ে কম দামের বাজার:{" "}
                <span className="font-semibold text-base-content">
                  {minMarketObj?.market || "প্রযোজ্য নয়"}
                </span>
              </p>
            </div>

            {/* Max Price Card */}
            <div className="card bg-base-100 border border-base-300 shadow-sm p-5 rounded-2xl">
              <span className="text-xs text-base-content/60 font-medium">
                সর্বাধিক দাম
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-error mt-1">
                {toBengaliNumber(overallMax)}{" "}
                <span className="text-sm font-normal text-base-content/70">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-base-content/60 mt-2 truncate">
                সবচেয়ে বেশি দামের বাজার:{" "}
                <span className="font-semibold text-base-content">
                  {maxMarketObj?.market || "প্রযোজ্য নয়"}
                </span>
              </p>
            </div>

            {/* Avg Price Card */}
            <div className="card bg-base-100 border border-base-300 shadow-sm p-5 rounded-2xl">
              <span className="text-xs text-base-content/60 font-medium">
                গড় দাম
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-base-content mt-1">
                {toBengaliNumber(product.today)}{" "}
                <span className="text-sm font-normal text-base-content/70">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-base-content/60 mt-2">
                প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}-এর হিসাবে
                বাজারমূল্য
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise Prices Table Section (বাজারভিত্তিক আজকের দাম) */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-base-content">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-base">
                {/* Table Head */}
                <thead className="bg-base-200 text-base-content font-semibold border-b border-base-300">
                  <tr>
                    <th className="py-4">বাজার</th>
                    <th>বিভাগ</th>
                    <th>সর্বনিম্ন</th>
                    <th>সর্বাধিক</th>
                    <th className="text-right">গড়</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {markets.map((m, index) => {
                    const avgVal = ((m.min + m.max) / 2).toFixed(1);
                    return (
                      <tr key={index} className="hover">
                        <td className="font-medium text-base-content py-4">
                          {m.market}
                        </td>
                        <td className="text-base-content/80">{m.division}</td>
                        <td>{toBengaliNumber(m.min)} টাকা</td>
                        <td>{toBengaliNumber(m.max)} টাকা</td>
                        <td className="text-right font-semibold">
                          {toBengaliNumber(avgVal)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;