import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IProduct {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: string; // "up", "down", or "flat"
    pct: number;
  };
}

const Marquee = async () => {
  // Get data through API
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: IProduct[] = await res.json();

  // convert numbers to Bengali digits with comma separation (e.g., ১,৮৫০)
  const toBengaliNumber = (num: number | string): string => {
    if (num === undefined || num === null) return "";
    return Number(num).toLocaleString("bn-BD");
  };

  //translate units into Bengali
  const translateUnitToBengali = (unit: string): string => {
    const unitMap: Record<string, string> = {
      kg: "কেজি",
      g: "গ্রাম",
      litre: "লিটার",
      ltr: "লিটার",
      pcs: "পিস",
      pc: "পিস",
      packet: "প্যাকেট",
    };
    return unitMap[unit.toLowerCase()] || unit;
  };

  return (
    // parent container
    <div className="bg-base-100 border-b border-base-200 overflow-hidden shadow-sm">
      <div className="container mx-auto">
        <MarqueeText
          direction="right"
          duration={35}
          className="py-2"
          pauseOnHover={true}
        >
          <div className="flex items-center gap-3">
            {data.map((product) => {
              // Color logic: green up, red down, gray flat
              const dir = product.change.dir;
              let changeColor = "text-base-content/60";
              let Arrow = "—";

              if (dir === "up") {
                changeColor = "text-[#D03739]";
                Arrow = "▲";
              } else if (dir === "down") {
                changeColor = "text-[#009245]";
                Arrow = "▼";
              }

              return (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <div className="flex items-center gap-2 px-4 py-1 border-r border-base-200 whitespace-nowrap text-sm sm:text-base">
                    {/* Category emoji icon */}
                    <span className="text-lg select-none">
                      {product.categoryIcon}
                    </span>

                    {/* Product name */}
                    <span className="font-semibold text-base-content">
                      {product.nameBn}
                    </span>

                    {/* Price & unit display */}
                    <div className="flex items-center gap-1 text-base-content/80 font-medium">
                      <span className="font-bold text-base-content">
                        {toBengaliNumber(product.today)}
                      </span>
                      <span className="text-xs opacity-75">টাকা/</span>
                      <span className="text-xs opacity-75">
                        {translateUnitToBengali(product.unit)}
                      </span>
                    </div>

                    {/* Change percentage badge */}
                    <div
                      className={`flex items-center gap-0.5 font-bold text-xs sm:text-sm px-1.5 py-0.5 rounded bg-base-200/50 ${changeColor}`}
                    >
                      <span>{Arrow}</span>
                      <span>
                        {toBengaliNumber(
                          Math.abs(product.change.pct).toFixed(1),
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
