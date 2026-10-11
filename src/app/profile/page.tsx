"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    toast.success("Name update successfull!");

    await authClient.updateUser({
      ...newUserData,
    });
  };

  const handleSignOut = async () => {
    toast.error("Sign Out successfull!");
    await authClient.signOut();
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm sm:text-base text-neutral/70 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User info card */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="avatar">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm relative">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user?.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral/20 flex items-center justify-center text-neutral font-bold text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral">
                  {user?.name || "User"}
                </h2>
                <p className="text-sm sm:text-base text-neutral/60">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error text-error hover:bg-error hover:text-white w-full sm:w-auto px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              সাইন আউট
            </button>
          </div>
        </div>

        {/* Update info section */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body p-4 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-neutral mb-4">
              তথ্য
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-neutral font-medium">
                    নাম
                  </span>
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.name || ""}
                  placeholder="Nahid Bhai"
                  className="input input-bordered w-full bg-base-100 focus:outline-none"
                />
              </div>

              {/* Update button */}
              <button
                type="submit"
                className="btn bg-[#008236] hover:bg-[#006b2d] text-white w-full text-base font-medium border-none shadow-md"
              >
                আপডেট
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
