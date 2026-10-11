"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ICategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="container mx-auto bg-[#fcfcfc] border-b border-gray-100 py-2">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start gap-2 md:gap-3 min-w-max px-2">
          {loading ? (
            // Skeleton loader while fetching categories
            <div className="flex gap-3 py-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"
                />
              ))}
            </div>
          ) : (
            categories.map((item) => {
              const href = `/category/${item.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm md:text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-700 hover:text-emerald-600 hover:bg-slate-100"
                  }`}
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.nameBn}</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
}