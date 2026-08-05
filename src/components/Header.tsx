"use client";

import { HiOutlineBell, HiOutlineSearch, HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:block">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-64 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* <button className="relative text-gray-600 hover:text-gray-900">
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button> */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
