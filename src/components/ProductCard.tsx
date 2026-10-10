import Link from "next/link";
import React from "react";

// Interface for the product prop
interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Array<{
    market: string;
    division: string;
    min: number;
    max: number;
  }>;
}

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Helper to translate units into Bengali
  const getUnitNameBn = (unit: string) => {
    switch (unit) {
      case "kg":
        return "প্রতি কেজি";
      case "litre":
        return "প্রতি লিটার";
      case "ltr":
        return "প্রতি লিটার";
      case "dozen":
        return "প্রতি ডজন";
      case "g":
        return "প্রতি গ্রাম";
      case "pcs":
        return "প্রতি পিস";
      case "pc":
        return "প্রতি পিস";
      case "piece":
        return "প্রতি পিস";
      case "packet":
        return "প্রতি প্যাকেট";
      default:
        return `প্রতি ${unit}`;
    }
  };

  // Helper to convert English numbers to Bengali numerals
  const convertToBengaliNumber = (num: number) => {
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((digit) =>
        englishDigits.includes(digit) ? bengaliDigits[Number(digit)] : digit,
      )
      .join("");
  };

  const { dir, pct } = product.change;

  // Styling configurations based on price direction (up/down/flat)
  const isUp = dir === "up";
  const isDown = dir === "down";

  // Badge background and text colors matching the soft pill aesthetic
  const badgeColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-600";

  const arrowSymbol = isUp ? "▲" : isDown ? "▼" : "•";

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all rounded-3xl p-5 sm:p-6 w-full">
        {/* Top Section: Icon and Product Details */}
        <div className="flex items-center gap-4">
          {/* Product Icon / Image Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-base-200/50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {product.image}
          </div>

          {/* Product Name & Unit */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral tracking-tight">
              {product.nameBn}
            </h2>
            <span className="text-sm sm:text-base text-gray-500 mt-0.5">
              {getUnitNameBn(product.unit)}
            </span>
          </div>
        </div>

        {/* Bottom Section: Pricing & Percentage Change Badge */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              আজকের দাম
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral mt-1 flex items-baseline gap-1.5">
              <span>{convertToBengaliNumber(product.today)}</span>
              <span className="text-lg sm:text-xl font-semibold text-neutral">
                টাকা
              </span>
            </div>
          </div>

          {/* Percentage Change Pill Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold ${badgeColor}`}
          >
            <span className="text-[10px] sm:text-xs">{arrowSymbol}</span>
            <span>{convertToBengaliNumber(Math.abs(pct))}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
