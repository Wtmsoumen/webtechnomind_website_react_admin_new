"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface ExtraSection {
  id?: number;
  section_type: string;
  title: string;
  sub_title: string;
  body: string;
  image: File | null;
  image2: File | null;
  imageUrl?: string;
  image2Url?: string;
  btn_url: string;
  btn_text: string;
}

const emptySection: ExtraSection = {
  section_type: "1", title: "", sub_title: "", body: "",
  image: null, image2: null, btn_url: "", btn_text: "",
};

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

interface SubPageFormProps {
  pageId?: string;
  parentId: number;
  posttype: string;
  backPath: string;
  title: string;
  entityLabel: string;
}

export default function SubPageForm({ pageId, parentId, posttype, backPath, title, entityLabel }: SubPageFormProps) {
  const router = useRouter();
  const isEdit = !!pageId;
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [displayInOptions, setDisplayInOptions] = useState<Record<string, string>>({});
  const [statusOptions, setStatusOptions] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    page_name: "", page_title: "", display_in: "1", status: "1",
    slug: "", body: "", meta_keyword: "", meta_description: "", page_schema: "",
  });
  const [pageImage, setPageImage] = useState<File | null>(null);
  const [pageImageUrl, setPageImageUrl] = useState("");
  const [metaImage, setMetaImage] = useState<File | null>(null);
  const [metaImageUrl, setMetaImageUrl] = useState("");
  const [sections, setSections] = useState<ExtraSection[]>([]);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_page_edit, { params: { id: pageId } });
        const rd = data.response_data;
        if (data.Page_Display_In_Array) setDisplayInOptions(data.Page_Display_In_Array);
        if (data.Status_Array) setStatusOptions(data.Status_Array);
        setForm({
          page_name: rd.page_name || "", page_title: rd.page_title || "",
          display_in: String(rd.display_in ?? "1"), status: String(rd.status ?? "1"),
          slug: rd.slug || "", body: rd.body || "",
          meta_keyword: rd.meta_keyword || "", meta_description: rd.meta_description || "",
          page_schema: rd.page_schema || "",
        });
        if (rd.image) setPageImageUrl(rd.image);
        if (rd.meta_image) setMetaImageUrl(rd.meta_image);
        if (rd.sections?.length) {
          setSections(rd.sections.map((s: Record<string, unknown>) => ({
            id: s.id as number, section_type: String(s.section_type ?? "1"),
            title: (s.title as string) || "", sub_title: (s.sub_title as string) || "",
            body: (s.body as string) || "", image: null, image2: null,
            imageUrl: (s.image as string) || "", image2Url: (s.image2 as string) || "",
            btn_url: (s.btn_url as string) || "", btn_text: (s.btn_text as string) || "",
          })));
        }
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, pageId]);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "page_name") {
      setForm((prev) => ({
        ...prev, [key]: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  };

  const updateSection = (index: number, key: string, value: string | File | null) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const deleteSection = async (index: number) => {
    const section = sections[index];
    if (section.id) {
      try {
        await apiClient.delete(endpoints.admin_page_section_delete, { params: { id: section.id } });
        toast.success("Section deleted");
      } catch {
        toast.error("Failed to delete section");
        return;
      }
    }
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteSectionImage = async (sectionId: number, imageField: string, index: number) => {
    try {
      await apiClient.delete(endpoints.admin_page_section_image_delete, { data: { id: sectionId, image_field: imageField } });
      setSections((prev) => prev.map((s, i) => i === index ? { ...s, [`${imageField}Url`]: "" } : s));
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (isEdit) fd.append("id", pageId!);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("parent_id", String(parentId));
      fd.append("posttype", posttype);
      if (pageImage) fd.append("image", pageImage);
      if (metaImage) fd.append("meta_image", metaImage);
      sections.forEach((s) => {
        if (s.id) fd.append("extra_id[]", String(s.id));
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

      const endpoint = isEdit ? endpoints.admin_page_update : endpoints.admin_page_add;
      await apiClient.post(endpoint, fd);
      toast.success(`${entityLabel} ${isEdit ? "updated" : "created"}`);
      router.push(backPath);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{entityLabel} Details</h2>
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
                {Object.keys(displayInOptions).length > 0
                  ? Object.entries(displayInOptions).map(([k, v]) => <option key={k} value={k}>{v}</option>)
                  : <>
                      <option value="0">None</option>
                      <option value="1">All</option>
                      <option value="2">Header</option>
                      <option value="3">Quick Links</option>
                      <option value="4">Other Links</option>
                      <option value="5">Header & Quick</option>
                    </>
                }
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value)}>
                {Object.keys(statusOptions).length > 0
                  ? Object.entries(statusOptions).map(([k, v]) => <option key={k} value={k}>{v}</option>)
                  : <>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </>
                }
              </select>
            </div>
            <div>
              <label className={labelClass}>Page Image</label>
              {pageImageUrl && !pageImage && (
                <div className="relative inline-block mb-2 group">
                  <img src={pageImageUrl} alt="Page" className="w-24 h-24 object-cover rounded-lg border" />
                  <button type="button" onClick={() => setPageImageUrl("")} className="absolute inset-0 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium">Remove</button>
                </div>
              )}
              <input type="file" accept="image/*" className={inputClass} onChange={(e) => setPageImage(e.target.files?.[0] || null)} />
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
              <label className={labelClass}>Meta Image</label>
              {metaImageUrl && !metaImage && (
                <div className="relative inline-block mb-2 group">
                  <img src={metaImageUrl} alt="Meta" className="w-24 h-24 object-cover rounded-lg border" />
                  <button type="button" onClick={() => setMetaImageUrl("")} className="absolute inset-0 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium">Remove</button>
                </div>
              )}
              <input type="file" accept="image/*" className={inputClass} onChange={(e) => setMetaImage(e.target.files?.[0] || null)} />
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
                <button type="button" onClick={() => deleteSection(i)} className="text-red-500 hover:text-red-700">
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
                  {section.imageUrl && !section.image && (
                    <div className="relative inline-block mb-2 group">
                      <img src={section.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                      {section.id && (
                        <button type="button" onClick={() => deleteSectionImage(section.id!, "image", i)} className="absolute inset-0 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium">Delete</button>
                      )}
                    </div>
                  )}
                  <input type="file" accept="image/*" className={inputClass} onChange={(e) => updateSection(i, "image", e.target.files?.[0] || null)} />
                </div>
                <div>
                  <label className={labelClass}>Image 2</label>
                  {section.image2Url && !section.image2 && (
                    <div className="relative inline-block mb-2 group">
                      <img src={section.image2Url} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                      {section.id && (
                        <button type="button" onClick={() => deleteSectionImage(section.id!, "image2", i)} className="absolute inset-0 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium">Delete</button>
                      )}
                    </div>
                  )}
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
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm disabled:opacity-60">
            {submitting ? "Saving..." : isEdit ? `Update ${entityLabel}` : `Save ${entityLabel}`}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
