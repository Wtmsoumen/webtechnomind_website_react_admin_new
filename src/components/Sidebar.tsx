"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSidebarPages } from "@/context/SidebarContext";
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

interface PageNode {
  id: number;
  page_name: string;
  slug: string;
  parent_id: number;
  children: PageNode[];
}

function TreeItem({
  node,
  depth,
  pathname,
  collapsed,
  openMenus,
  toggleMenu,
}: {
  node: PageNode;
  depth: number;
  pathname: string;
  collapsed: boolean;
  openMenus: Record<string, boolean>;
  toggleMenu: (key: string) => void;
}) {
  const href = `/pages/sub/${node.id}`;
  const hasChildren = node.children.length > 0;
  const key = `page-${node.id}`;
  const isActive = pathname.startsWith(href);
  const isChildActive = node.children.some(
    (c) => pathname.startsWith(`/pages/sub/${c.id}`) || c.children.some((gc) => pathname.startsWith(`/pages/sub/${gc.id}`))
  );
  const open = openMenus[key] || isActive || isChildActive;
  const ml = depth * 12;

  if (depth === 0) {
    return (
      <div>
        {hasChildren ? (
          <button
            onClick={() => toggleMenu(key)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors text-left ${
              isActive || isChildActive
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            style={{ width: "calc(100% - 16px)" }}
          >
            <HiOutlineFolder className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="text-sm flex-1 truncate">{node.page_name}</span>
                {open ? <HiOutlineChevronDown className="w-4 h-4 shrink-0" /> : <HiOutlineChevronRight className="w-4 h-4 shrink-0" />}
              </>
            )}
          </button>
        ) : (
          <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <HiOutlineFolder className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm">{node.page_name}</span>}
          </Link>
        )}

        {!collapsed && open && hasChildren && (
          <div className="ml-6 mt-1 space-y-1">
            <Link
              href={href}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                pathname === href
                  ? "text-primary-600 bg-primary-50 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
              All {node.page_name}
            </Link>
            {node.children
              .map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  pathname={pathname}
                  collapsed={collapsed}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ paddingLeft: `${ml}px` }}>
        {hasChildren ? (
          <button
            onClick={() => toggleMenu(key)}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-left text-sm ${
              isActive || isChildActive
                ? "text-primary-600 font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
            <span className="flex-1 truncate">{node.page_name}</span>
            {!collapsed && (open ? <HiOutlineChevronDown className="w-3.5 h-3.5 shrink-0" /> : <HiOutlineChevronRight className="w-3.5 h-3.5 shrink-0" />)}
          </button>
        ) : (
          <Link
            href={href}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
              isActive
                ? "text-primary-600 bg-primary-50 font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
            <span className="truncate">{node.page_name}</span>
          </Link>
        )}
      </div>

      {!collapsed && open && hasChildren && (
        <div className="space-y-0.5">
          <Link
            href={href}
            className={`flex items-center gap-2 py-1.5 pr-4 rounded-lg transition-colors text-sm ${
              pathname === href
                ? "text-primary-600 bg-primary-50 font-medium"
                : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
            }`}
            style={{ paddingLeft: `${28 + ml + 12}px` }}
          >
            <span className="w-1 h-1 rounded-full bg-current opacity-50" />
            All {node.page_name}
          </Link>
          {node.children
            .filter((child) => child.children.length > 0)
            .map((child) => (
              <TreeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                pathname={pathname}
                collapsed={collapsed}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
              />
            ))}
        </div>
      )}
    </div>
  );
}

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
  const { pageTree } = useSidebarPages();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
            isActive("/dashboard")
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <HiOutlineHome className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Dashboard</span>}
        </Link>

        <Link
          href="/pages"
          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
            pathname === "/pages" || pathname === "/pages/add" || (pathname.startsWith("/pages/edit") && !pathname.includes("/sub/"))
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <HiOutlineDocumentText className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Pages</span>}
        </Link>

        {pageTree.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            pathname={pathname}
            collapsed={collapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
        ))}

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
            isActive("/settings")
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <HiOutlineCog className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
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
