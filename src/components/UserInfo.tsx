"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
    console.log(user, "from userinfo page");

  const handleSignOut = async () => {
   toast.error("Sign Out successfull!")
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 md:gap-3 cursor-pointer group p-1.5 rounded-2xl hover:bg-base-200 transition-all duration-200"
            >
              {/* Avatar Box with Image or First Letter Fallback */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden bg-emerald-100 shadow-sm flex items-center justify-center border border-base-300">
                {user?.image || user?.photoURL ? (
                  <Image
                    src={user?.image || user?.photoURL}
                    alt={user?.name || user?.displayName || "User"}
                    fill
                    sizes="(max-width: 768px) 48px, 56px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xl md:text-2xl font-extrabold text-[#009245]">
                    {(user?.name || user?.displayName || user?.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              {/* Name & Dropdown Arrow */}
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-800">
                  {user?.name || user?.displayName}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-zinc-500 transition-transform group-hover:translate-y-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>

            {/* Dropdown Menu Content matching the image */}
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-3 shadow-xl bg-base-100 rounded-3xl w-72 mt-3 border border-base-200"
            >
              {/* User Details Header */}
              <div className="px-3 py-2 border-b border-base-200 mb-2">
                <p className="font-bold text-lg text-zinc-900 truncate">
                  {user?.name || user?.displayName || "Rezwan Ahmed"}
                </p>
                <p className="text-sm text-zinc-500 truncate">
                  {user?.email || "rezwanahmed@gmail.com"}
                </p>
              </div>

              {/* My Profile Link */}
              <li>
                <a className="flex items-center gap-3 py-3 px-3 text-zinc-700 font-medium hover:bg-base-200 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-zinc-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                  আমার প্রোফাইল
                </a>
              </li>

              {/* Sign Out / Logout Link */}
              <li>
                <a
                  onClick={handleSignOut}
                  className="flex items-center gap-3 py-3 px-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  সাইন আউট
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 md:gap-4">
          <Link href={"/signin"}>
            {" "}
            <button className="btn btn-sm md:btn-md btn-ghost text-[#1A2E35] font-semibold">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/signup"}>
            {" "}
            <button className="btn btn-sm md:btn-md btn-primary bg-[#009245] text-white border-none rounded-full px-5 md:px-7 font-bold hover:bg-[#007b3a]">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
