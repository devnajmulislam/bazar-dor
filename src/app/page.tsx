import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default async function Home() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();

  // Top 6 Risers
  const topRisers = [...data]
    .filter((item) => item.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 Fallers
  const topFallers = [...data]
    .filter((item) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10 md:space-y-14 pb-16">
      <Marquee />
      <Banner />

      {/* আজ দাম বেড়েছে - Top 6 Risers */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
          <span className="text-[#D03739]">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topRisers.map((tp) => (
            <ProductCard product={tp} key={tp.id} />
          ))}
        </div>
      </div>

      {/* আজ দাম কমেছে - Top 6 Fallers */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
          <span className="text-[#009245]">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topFallers.map((fp) => (
            <ProductCard product={fp} key={fp.id} />
          ))}
        </div>
      </div>

      {/* সব পণ্য - All Products */}
      <div className="container mx-auto px-4" id="সব-পণ্য">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold">সব পণ্য</h2>
          <p className="text-sm text-gray-500 mt-1">
            মোট {data.length} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((p: Product) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
}