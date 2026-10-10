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

  //Top 6 Fallers
  const topFallers = [...data]
    .filter((item) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      <Marquee />
      <Banner />
      {/* aj dam bere se top 6 */}
      <div className="container mx-auto">
        <h2 className="text-3xl">▲ আজ দাম বেড়েছে</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topRisers.map((tp) => (
            <ProductCard product={tp} key={tp.id} />
          ))}
        </div>
      </div>
      {/* aj dam kome se top 6 */}
      <div className="container mx-auto">
        <h2 className="text-3xl">▼ আজ দাম কমেছে</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {" "}
          {topFallers.map((fp) => (
            <ProductCard product={fp} key={fp.id}></ProductCard>
          ))}
        </div>
      </div>
      {/* sob ponno */}
      <div className="container mx-auto">
        <h1 className="text-3xl">সব পণ্য</h1>
        <p>মোট {data.length} টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {" "}
          {data.map((p:Product) => (
            <ProductCard product={p} key={p.id}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}
