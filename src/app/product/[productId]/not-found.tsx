// app/product/[productId]/not-found.tsx
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-base-200">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-error">৪০৪ - পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-base-content/60">
          দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা আমাদের সিস্টেমে নেই বা ভুল লিঙ্কে প্রবেশ করেছেন।
        </p>
        <div>
          <Link href="/" className="btn btn-primary mt-2">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}