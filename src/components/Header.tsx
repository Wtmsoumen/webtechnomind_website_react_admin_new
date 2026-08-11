"use client";

import { HiOutlineBell, HiOutlineSearch, HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { usePostTypeFilter } from "@/context/PostTypeFilterContext";
import { usePathname } from "next/navigation";

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const { postTypeFilter, setPostTypeFilter, postTypeOptions } = usePostTypeFilter();
  const showFilter = pathname.startsWith("/pages");

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
        {showFilter && Object.keys(postTypeOptions).length > 0 && (
          <select
            value={postTypeFilter}
            onChange={(e) => setPostTypeFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">All Types</option>
            {Object.entries(postTypeOptions).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        )}
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
