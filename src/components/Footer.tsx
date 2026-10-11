const Footer = () => {
  return (
    // container
    <footer className="bg-base-200 text-base-content border-t border-base-300 py-4 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
        {/* Left text */}
        <p className="text-center md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right text */}
        <p className="text-center md:text-right text-base-content/70">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
