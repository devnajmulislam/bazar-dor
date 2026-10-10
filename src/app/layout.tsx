import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
   subsets: ["latin", "bengali"],
});


export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bangladeshi local bazar expences representative.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"

      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar */}
        <Header/>

        {/* Render all pages */}
        <div>{children}</div>

        {/* Footer */}
        <Footer/>
      </body>
    </html>
  );
}
