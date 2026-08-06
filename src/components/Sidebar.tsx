"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import {
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineLogout,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineFolder,
} from "react-icons/hi";
import Logo from "../../public/images/logo.svg";
import Image from "next/image";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }> | string;
  children?: { label: string; href: string }[];
}

interface ParentPage {
  id: number;
  page_name: string;
  slug: string;
  image?: string;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_Image_URL || "";

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [parentPages, setParentPages] = useState<ParentPage[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_pages, {
          params: { orderby: "menu_order", order: "asc", per_page: 100 },
        });
        const pages = data.response_data?.data || [];
        setParentPages(pages.filter((p: Record<string, unknown>) => !p.parent_id || Number(p.parent_id) === 0));
      } catch { /* ignore */ }
    })();
  }, []);

  const staticTop: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: HiOutlineHome },
    { label: "Pages", href: "/pages", icon: HiOutlineDocumentText },
  ];

  const dynamicItems: NavItem[] = parentPages.map((p) => ({
    label: p.page_name,
    icon: p.image ? `${IMAGE_BASE_URL}${p.image}` : HiOutlineFolder,
    children: [
      { label: `All ${p.page_name}`, href: `/pages/sub/${p.id}` },
    ],
  }));

  const staticBottom: NavItem[] = [
    { label: "Settings", href: "/settings", icon: HiOutlineCog },
  ];

  const navItems = [...staticTop, ...dynamicItems, ...staticBottom];

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((c) => pathname.startsWith(c.href));

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
        {!collapsed && (
          <Image src={Logo} alt="Logo" width={1920} height={1080} className="w-44 h-auto" />
        )}
        <button onClick={onToggle} className="text-gray-600 p-1 hover:bg-gray-100 rounded">
          <HiOutlineMenu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;
          const open = openMenus[item.label] || isParentActive(item.children);

          if (!hasChildren && item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${isActive(item.href)
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {typeof Icon === "string" ? (
                  <img src={Icon} alt={item.label} className="w-5 h-5 shrink-0 object-cover rounded" />
                ) : (
                  <Icon className="w-5 h-5 shrink-0" />
                )}
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          }

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${isParentActive(item.children)
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                style={{ width: "calc(100% - 16px)" }}
              >
                {typeof Icon === "string" ? (
                  <img src={Icon} alt={item.label} className="w-5 h-5 shrink-0 object-cover rounded" />
                ) : (
                  <Icon className="w-5 h-5 shrink-0" />
                )}
                {!collapsed && (
                  <>
                    <span className="text-sm flex-1 text-left">{item.label}</span>
                    {open ? (
                      <HiOutlineChevronDown className="w-4 h-4" />
                    ) : (
                      <HiOutlineChevronRight className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>
              {!collapsed && open && item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${isActive(child.href)
                        ? "text-primary-600 bg-primary-50 font-medium"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <HiOutlineLogout className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
