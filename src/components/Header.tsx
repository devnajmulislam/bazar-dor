import Image from "next/image";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    // Main header container with responsive padding, background, and shadow for subtle depth
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Left Section: Logo, Title, and Date */}
        <div className="flex items-center gap-3">
          {/* Logo with specific styling based on the image */}
          <div className="bg-[#009245] p-2.5 rounded-2xl flex items-center justify-center shrink-0">
            <Image
              src={"/logo-icon.png"}
              alt="বাজার দর লোগো"
              width={26}
              height={26}
              className="text-white"
            />
          </div>

          {/* Title and Dynamic Date (visible on all screens) */}
          <div className="flex flex-col">
            <h1 className="text-[#1A2E35] text-xl md:text-2xl font-extrabold leading-tight">
              বাজার দর
            </h1>
            <p className="text-[#64748B] text-xs md:text-sm font-medium mt-0.5">
              {date}
            </p>
          </div>
        </div>

        {/* Right Section: Auth Buttons with responsive hiding/display */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Sign In is typically a ghost/text button to match the image */}
          <button className="btn btn-sm md:btn-md btn-ghost text-[#1A2E35] font-semibold">
            সাইন ইন
          </button>
          
          {/* Sign Up is the primary action button */}
          <button className="btn btn-sm md:btn-md btn-primary bg-[#009245] text-white border-none rounded-full px-5 md:px-7 font-bold hover:bg-[#007b3a]">
            সাইন আপ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;