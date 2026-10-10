"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CategoryProductPage = () => {
  const params = useParams();
  const categoryId = params?.categoryId;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  // Fetching data from API
  useEffect(() => {
    if (!categoryId) return;
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
        );
        const result = await res.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Price parser function for Bengali/English digits and text
  const parsePrice = (priceValue) => {
    if (!priceValue) return 0;
    const str = String(priceValue);
    
    // Convert Bengali digits to English digits
    const bengaliDigits = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
    const converted = str.replace(/[০-৯]/g, (match) => bengaliDigits[match]);
    
    // Extract numbers (including decimals)
    const match = converted.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-lg font-medium text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-2 text-base-content">৪০৪ - কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">
          দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই।
        </p>
        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Sorting logic using parsePrice
let sortedData = [...data];
  if (sortOrder === "low-to-high") {
    sortedData.sort((a, b) => parsePrice(a.today) - parsePrice(b.today));
  } else if (sortOrder === "high-to-low") {
    sortedData.sort((a, b) => parsePrice(b.today) - parsePrice(a.today));
  }

  // Dynamic category name and icon
const categoryTitle = data[0]?.categoryNameBn || "চাল";
  const categoryIcon = data[0]?.categoryIcon || "🍚";

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* 1. Top Header Card */}
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-6">
        <div className="card-body flex flex-row items-center gap-4 py-6 px-6">
          <div className="text-4xl bg-base-200 p-4 rounded-2xl flex items-center justify-center">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
              {categoryTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filter / Sort Section */}
      <div className="card bg-base-100 shadow-sm border border-base-200 mb-6">
        <div className="card-body py-4 px-6 flex flex-row items-center justify-between">
          <div className="text-sm text-gray-600 hidden sm:block"></div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium text-gray-600">সাজান:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered select-sm w-auto max-w-xs focus:outline-none bg-base-100"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Product Count Text */}
      <p className="text-sm text-gray-600 mb-4">
        মোট {sortedData.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* 4. Responsive Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sortedData.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductPage;