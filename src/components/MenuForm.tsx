"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
      {title}
    </div>
  );
}

type MenuType = "industry" | "technology" | "company" | "services";

interface DynamicItem {
  title: string;
  description: string;
}

const menuTypeConfig: Record<MenuType, {
  parentLabel: string;
  parentOptions: string[];
  nameLabel: string;
  showSlug?: boolean;
  showSubHero?: boolean;
  dynamicSections: { label: string; buttonLabel: string }[];
}> = {
  industry: {
    parentLabel: "Parent Industry",
    parentOptions: ["Parent Industry", "Business & Tech", "Healthcare", "Finance", "Education"],
    nameLabel: "Industry Name",
    showSubHero: true,
    dynamicSections: [
      { label: "Core Digital Solutions", buttonLabel: "Add Core Solutions" },
      { label: "Common Inquiries", buttonLabel: "Add Inquiry" },
      { label: "Unrivaled Expertise", buttonLabel: "Add Expertise" },
      { label: "Global Partnership Network", buttonLabel: "Add Partnership" },
    ],
  },
  technology: {
    parentLabel: "Parent Technology",
    parentOptions: ["Parent Technology", "Frontend", "Backend", "Mobile", "Cloud", "AI & ML", "Database"],
    nameLabel: "Menu Name",
    showSubHero: true,
    dynamicSections: [
      { label: "Faq Section", buttonLabel: "Add Faq" },
    ],
  },
  company: {
    parentLabel: "Parent Menu",
    parentOptions: ["Main Menu", "About WTM", "Company"],
    nameLabel: "Menu Name",
    showSlug: false,
    dynamicSections: [
      { label: "FAQ Section", buttonLabel: "Add Faq" },
      { label: "Stats Section", buttonLabel: "Add Stats" },
      { label: "Why Choose Us Section", buttonLabel: "Add Why Choose Us" },
    ],
  },
  services: {
    parentLabel: "Parent Menu",
    parentOptions: ["Main Menu", "Services", "Ai Solutions"],
    nameLabel: "Menu Name",
    dynamicSections: [
      { label: "FAQ Section", buttonLabel: "Add Faq" },
      { label: "Technology", buttonLabel: "Add Stats" },
    ],
  },
};

interface MenuFormProps {
  menuType: MenuType;
  isEdit?: boolean;
  initialData?: Record<string, string>;
}

export default function MenuForm({ menuType, isEdit = false, initialData }: MenuFormProps) {
  const config = menuTypeConfig[menuType];

  const [form, setForm] = useState({
    parent: initialData?.parent ?? config.parentOptions[0],
    name: initialData?.name ?? "",
    metaTitle: initialData?.metaTitle ?? "",
    metaKeyword: initialData?.metaKeyword ?? "",
    displayIn: initialData?.displayIn ?? "Header",
    slug: initialData?.slug ?? "",
    metaDescription: initialData?.metaDescription ?? "",
    schemaSection: initialData?.schemaSection ?? "",
    heroTitle: initialData?.heroTitle ?? "",
    heroDescription: initialData?.heroDescription ?? "",
    bannerTitle: initialData?.bannerTitle ?? "",
    bannerDescription: initialData?.bannerDescription ?? "",
    subHeroTitle: initialData?.subHeroTitle ?? "",
    subHeroDescription: initialData?.subHeroDescription ?? "",
    status: initialData?.status ?? "Active",
    quotationTitle: initialData?.quotationTitle ?? "",
    quotationDescription: initialData?.quotationDescription ?? "",
    technology: initialData?.technology ?? "",
  });

  const [dynamicSections, setDynamicSections] = useState<Record<string, DynamicItem[]>>(
    Object.fromEntries(config.dynamicSections.map((s) => [s.label, []]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" ? { slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") } : {}),
    }));
  };

  const addDynamicItem = (section: string) => {
    setDynamicSections((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), { title: "", description: "" }],
    }));
  };

  const removeDynamicItem = (section: string, index: number) => {
    setDynamicSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateDynamicItem = (section: string, index: number, field: string, value: string) => {
    setDynamicSections((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert(isEdit ? "Updated!" : "Created!");
      }}
    >
      {/* Top Fields */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>{config.parentLabel}</label>
          <select name="parent" value={form.parent} onChange={handleChange} className={`${inputClass} max-w-xs`}>
            {config.parentOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>{config.nameLabel} <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter Name" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Meta Title <span className="text-red-500">*</span></label>
            <input name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="Enter Title" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Meta keyword <span className="text-red-500">*</span></label>
            <input name="metaKeyword" value={form.metaKeyword} onChange={handleChange} placeholder="Enter Meta Keyword" className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Display In</label>
            <select name="displayIn" value={form.displayIn} onChange={handleChange} className={inputClass}>
              <option>Header</option>
              <option>Footer</option>
              <option>Both</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Slug <span className="text-red-500">*</span></label>
            <input name="slug" value={form.slug} onChange={handleChange} placeholder="enter-slug" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Meta Description <span className="text-red-500">*</span></label>
            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} placeholder="Enter Description" rows={3} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Schema Section</label>
          <textarea name="schemaSection" value={form.schemaSection} onChange={handleChange} rows={3} className={inputClass} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <SectionHeader title="Hero Section" />
        <div>
          <label className={labelClass}>Hero Title <span className="text-red-500">*</span></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Hero Title" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hero Description <span className="text-red-500">*</span></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description" rows={4} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hero Image</label>
          <input type="file" accept="image/*" className={inputClass} />
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <SectionHeader title="Banner Section" />
        <div>
          <label className={labelClass}>Banner Title</label>
          <input name="bannerTitle" value={form.bannerTitle} onChange={handleChange} placeholder="banner Title" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Banner Description</label>
          <textarea name="bannerDescription" value={form.bannerDescription} onChange={handleChange} placeholder="Hero Description" rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Banner Image</label>
          <input type="file" accept="image/*" className={inputClass} />
        </div>
      </div>

      {/* Sub Hero Section (Industry & Technology only) */}
      {config.showSubHero && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Sub Hero Section" />
          <div>
            <label className={labelClass}>Sub Hero Title <span className="text-red-500">*</span></label>
            <input name="subHeroTitle" value={form.subHeroTitle} onChange={handleChange} placeholder="Hero Title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sub Hero Description <span className="text-red-500">*</span></label>
            <textarea name="subHeroDescription" value={form.subHeroDescription} onChange={handleChange} placeholder="Hero Description" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sub Hero Image</label>
            <input type="file" accept="image/*" className={inputClass} />
          </div>
        </div>
      )}

      {/* Menu Quotation Section (Company only) */}
      {menuType === "company" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Menu Quotation Section" />
          <div>
            <label className={labelClass}>Menu Quotation Title</label>
            <input name="quotationTitle" value={form.quotationTitle} onChange={handleChange} placeholder="Enter Menu Quotation Title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Menu Quotation Description</label>
            <textarea name="quotationDescription" value={form.quotationDescription} onChange={handleChange} placeholder="Enter Menu Quotation Description" rows={3} className={inputClass} />
          </div>
        </div>
      )}

      {/* Menu Settings (Company only) */}
      {menuType === "company" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Menu Settings" />
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={`${inputClass} max-w-xs`}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      )}

      {/* Status (non-company) */}
      {menuType !== "company" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={`${inputClass} max-w-xs`}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      )}

      {/* Technology (Industry only) */}
      {menuType === "industry" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div>
            <label className={labelClass}>Technology</label>
            <select name="technology" value={form.technology} onChange={handleChange} className={inputClass}>
              <option value="">Select Core Technology</option>
              <option>React</option>
              <option>Next.js</option>
              <option>Node.js</option>
              <option>Python</option>
              <option>Angular</option>
              <option>Flutter</option>
            </select>
          </div>
        </div>
      )}

      {/* Dynamic Sections */}
      {config.dynamicSections.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {config.dynamicSections.map((section) => (
            <div key={section.label} className="space-y-3">
              <label className={labelClass}>{section.label}</label>
              {(dynamicSections[section.label] || []).map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <input
                      value={item.title}
                      onChange={(e) => updateDynamicItem(section.label, i, "title", e.target.value)}
                      placeholder="Title"
                      className={inputClass}
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => updateDynamicItem(section.label, i, "description", e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDynamicItem(section.label, i)}
                    className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addDynamicItem(section.label)}
                className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
              >
                <HiOutlinePlus className="w-4 h-4" /> {section.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm"
        >
          {isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
