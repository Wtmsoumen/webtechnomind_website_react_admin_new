"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineLogout,
  HiOutlineStar,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineSpeakerphone,
  HiOutlineOfficeBuilding,
  HiOutlineGlobe,
  HiOutlinePhotograph,
  HiOutlineTemplate,
  HiOutlineCog,
  HiOutlineNewspaper,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineChip,
} from "react-icons/hi";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HiOutlineHome },
  {
    label: "Services",
    icon: HiOutlineLightBulb,
    children: [
      { label: "All AI Services", href: "/ai-solutions" },
      // { label: "AI Development", href: "/ai-solutions/ai-development" },
      // { label: "AI Chatbot", href: "/ai-solutions/ai-chatbot" },
      // { label: "Generative AI", href: "/ai-solutions/generative-ai" },
      // { label: "AI Agent", href: "/ai-solutions/ai-agent" },
      // { label: "AI Integration", href: "/ai-solutions/ai-integration" },
      // { label: "ML Development", href: "/ai-solutions/ml-development" },
      // { label: "AI Product Dev", href: "/ai-solutions/ai-product" },
    ],
  },
  {
    label: "Digital Marketing",
    icon: HiOutlineSpeakerphone,
    children: [
      { label: "All Services", href: "/digital-marketing" },
      // { label: "SEO Services", href: "/digital-marketing/seo" },
      // { label: "Social Media", href: "/digital-marketing/social-media" },
      // { label: "Lead Generation", href: "/digital-marketing/lead-generation" },
      // { label: "Content Marketing", href: "/digital-marketing/content" },
      // { label: "Google Ads", href: "/digital-marketing/google-ads" },
      // { label: "Paid Advertising", href: "/digital-marketing/paid-ads" },
    ],
  },
  {
    label: "Development",
    icon: HiOutlineCode,
    children: [
      { label: "All Services", href: "/web-software" },
      // { label: "Web App Dev", href: "/web-software/web-app" },
      // { label: "Mobile App Dev", href: "/web-software/mobile-app" },
      // { label: "iOS App Dev", href: "/web-software/ios-app" },
      // { label: "Android App Dev", href: "/web-software/android-app" },
      // { label: "Software Dev", href: "/web-software/software" },
      // { label: "Blockchain Dev", href: "/web-software/blockchain" },
      // { label: "E-commerce Dev", href: "/web-software/ecommerce" },
    ],
  },
  {
    label: "Industries",
    icon: HiOutlineOfficeBuilding,
    children: [
      { label: "All Industries", href: "/industries" },
      // { label: "Add Industry", href: "/industries/add" },
    ],
  },
  {
    label: "Technologies",
    icon: HiOutlineChip,
    children: [
      { label: "Technology List", href: "/technologies" },
      // { label: "Add Technology", href: "/technologies/add" },
    ],
  },
  {
    label: "Portfolio",
    icon: HiOutlineTemplate,
    children: [
      { label: "All Projects", href: "/portfolio" },
      // { label: "Add Project", href: "/portfolio/add" },
      // { label: "Case Studies", href: "/portfolio/case-studies" },
    ],
  },
  {
    label: "Company",
    icon: HiOutlineGlobe,
    children: [
      { label: "Team", href: "/company/team" },
      { label: "Careers", href: "/company/careers" },
      { label: "Gallery", href: "/company/gallery" },
      { label: "Company Journey", href: "/company/journey" },
    ],
  },
  {
    label: "Blog",
    icon: HiOutlineNewspaper,
    children: [
      { label: "All Posts", href: "/blog" },
      // { label: "Add Post", href: "/blog/add" },
    ],
  },
  {
    label: "Reviews",
    icon: HiOutlineStar,
    children: [
      { label: "All Reviews", href: "/reviews" },
      // { label: "Add Review", href: "/reviews/add" },
    ],
  },
  {
    label: "Leads & Inquiries",
    icon: HiOutlineUserGroup,
    children: [
      { label: "Contact Inquiries", href: "/leads/contacts" },
      { label: "Quote Requests", href: "/leads/quotes" },
    ],
  },
  { label: "Settings", href: "/settings", icon: HiOutlineCog },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((c) => pathname.startsWith(c.href));

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"
        }`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
        {!collapsed && (
          <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent tracking-wide">
            WTM Admin
          </span>
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
                <Icon className="w-5 h-5 shrink-0" />
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
                <Icon className="w-5 h-5 shrink-0" />
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
        <button className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <HiOutlineLogout className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
