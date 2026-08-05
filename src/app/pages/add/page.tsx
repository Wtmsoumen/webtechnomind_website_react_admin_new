"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface ExtraSection {
  section_type: string;
  title: string;
  sub_title: string;
  body: string;
  image: File | null;
  image2: File | null;
  btn_url: string;
  btn_text: string;
}

const emptySection: ExtraSection = {
  section_type: "1",
  title: "",
  sub_title: "",
  body: "",
  image: null,
  image2: null,
  btn_url: "",
  btn_text: "",
};

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddPagePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    page_name: "",
    page_title: "",
    display_in: "1",
    status: "1",
    slug: "",
    body: "",
    meta_keyword: "",
    meta_description: "",
    page_schema: "",
    posttype: "page",
  });
  const [sections, setSections] = useState<ExtraSection[]>([]);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "page_name") {
      setForm((prev) => ({
        ...prev,
        [key]: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  };

  const updateSection = (index: number, key: string, value: string | File | null) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      sections.forEach((s) => {
        fd.append("extra_section_type[]", s.section_type);
        fd.append("extra_title[]", s.title);
        fd.append("extra_sub_title[]", s.sub_title);
        fd.append("extra_body[]", s.body);
        fd.append("extra_btn_url[]", s.btn_url);
        fd.append("extra_btn_text[]", s.btn_text);
        if (s.image) fd.append("extra_image[]", s.image);
        else fd.append("extra_image[]", "");
        if (s.image2) fd.append("extra_image2[]", s.image2);
        else fd.append("extra_image2[]", "");
      });

      await apiClient.post(endpoints.admin_page_add, fd);
      toast.success("Page created");
      router.push("/pages");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create page");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Page</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Page Name *</label>
              <input type="text" className={inputClass} value={form.page_name} onChange={(e) => updateField("page_name", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Page Title *</label>
              <input type="text" className={inputClass} value={form.page_title} onChange={(e) => updateField("page_title", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Slug *</label>
              <input type="text" className={inputClass} value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Display In</label>
              <select className={inputClass} value={form.display_in} onChange={(e) => updateField("display_in", e.target.value)}>
                <option value="1">Header</option>
                <option value="2">Footer</option>
                <option value="3">Both</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value)}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Post Type</label>
              <select className={inputClass} value={form.posttype} onChange={(e) => updateField("posttype", e.target.value)}>
                <option value="page">Page</option>
                <option value="service">Service</option>
                <option value="project">Project</option>
                <option value="company">Company</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Body</label>
            <textarea className={inputClass} rows={6} value={form.body} onChange={(e) => updateField("body", e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input type="text" className={inputClass} value={form.meta_keyword} onChange={(e) => updateField("meta_keyword", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea className={inputClass} rows={3} value={form.meta_description} onChange={(e) => updateField("meta_description", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Page Schema</label>
              <textarea className={inputClass} rows={3} value={form.page_schema} onChange={(e) => updateField("page_schema", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Extra Sections</h2>
            <button type="button" onClick={() => setSections((prev) => [...prev, { ...emptySection }])} className="flex items-center gap-1 text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg font-medium hover:bg-primary-100">
              <HiOutlinePlus className="w-4 h-4" /> Add Section
            </button>
          </div>

          {sections.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No extra sections added</p>}

          {sections.map((section, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Section {i + 1}</span>
                <button type="button" onClick={() => setSections((prev) => prev.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-700">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Section Type</label>
                  <select className={inputClass} value={section.section_type} onChange={(e) => updateSection(i, "section_type", e.target.value)}>
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                    <option value="3">Type 3</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Title</label>
                  <input type="text" className={inputClass} value={section.title} onChange={(e) => updateSection(i, "title", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Sub Title</label>
                  <input type="text" className={inputClass} value={section.sub_title} onChange={(e) => updateSection(i, "sub_title", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Button Text</label>
                  <input type="text" className={inputClass} value={section.btn_text} onChange={(e) => updateSection(i, "btn_text", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Button URL</label>
                  <input type="text" className={inputClass} value={section.btn_url} onChange={(e) => updateSection(i, "btn_url", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Image</label>
                  <input type="file" accept="image/*" className={inputClass} onChange={(e) => updateSection(i, "image", e.target.files?.[0] || null)} />
                </div>
                <div>
                  <label className={labelClass}>Image 2</label>
                  <input type="file" accept="image/*" className={inputClass} onChange={(e) => updateSection(i, "image2", e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="mt-3">
                <label className={labelClass}>Body</label>
                <textarea className={inputClass} rows={3} value={section.body} onChange={(e) => updateSection(i, "body", e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm disabled:opacity-60">
            {submitting ? "Saving..." : "Save Page"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
