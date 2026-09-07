"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import DeleteModal from "@/components/DeleteModal";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash, HiChevronDown } from "react-icons/hi";
import { useSidebarPages } from "@/context/SidebarContext";

interface ExtraSection {
  id?: number;
  section_type: string;
  title: string;
  sub_title: string;
  body: string;
  image: File | string | null;
  image2: File | string | null;
  btn_url: string;
  btn_text: string;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const emptySection: ExtraSection = {
  section_type: "1", title: "", sub_title: "", body: "",
  image: null, image2: null, btn_url: "", btn_text: "",
};

interface PageOption {
  id: number;
  page_name: string;
}

function ParentPageDropdown({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<PageOption[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchPages = useCallback(async (page: number, query: string, reset = false) => {
    setLoadingMore(true);
    try {
      const { data } = await apiClient.get(endpoints.admin_pages, {
        params: { orderby: "page_name", order: "asc", per_page: 20, page, search: query || undefined },
      });
      const items: PageOption[] = (data.response_data?.data || []).map((p: { id: number; page_name: string }) => ({
        id: p.id,
        page_name: p.page_name,
      }));
      const total = data.response_data?.total || 0;
      setPages((prev) => {
        const merged = reset ? items : [...prev, ...items];
        setHasMore(merged.length < total);
        return merged;
      });
    } catch { /* ignore */ } finally {
      setLoadingMore(false);
    }
  }, []);

  // Initial load when opening
  useEffect(() => {
    if (open) {
      setPages([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchPages(1, search, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Search debounce
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setPages([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchPages(1, search, true);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Resolve label for selected value on mount / value change
  useEffect(() => {
    if (!value) return;
    const found = pages.find((p) => String(p.id) === value);
    if (found) { setSelectedLabel(found.page_name); return; }
    apiClient.get(endpoints.admin_pages, { params: { id: value } })
      .then(({ data }) => {
        const item = data.response_data?.data?.[0];
        if (item) setSelectedLabel(item.page_name);
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || loadingMore || !hasMore) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      const next = currentPage + 1;
      setCurrentPage(next);
      fetchPages(next, search, false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (pg: PageOption) => {
    onChange(String(pg.id));
    setSelectedLabel(pg.page_name);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={`${className} flex items-center justify-between cursor-pointer`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
          {selectedLabel || "Select parent page"}
        </span>
        <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded outline-none focus:border-primary-400"
            />
          </div>
          <div ref={listRef} onScroll={handleScroll} className="max-h-48 overflow-y-auto">
            {pages.length === 0 && !loadingMore && (
              <p className="px-3 py-2 text-sm text-gray-400 text-center">No pages found</p>
            )}
            {pages.map((pg) => (
              <button
                key={pg.id}
                type="button"
                onClick={() => select(pg)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors ${String(pg.id) === value ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-700"}`}
              >
                {pg.page_name}
              </button>
            ))}
            {loadingMore && (
              <div className="flex justify-center py-2">
                <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const { refresh: refreshSidebar } = useSidebarPages();
  const isEdit = !!pageId;
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_Image_URL || "";

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [displayInOptions, setDisplayInOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<Record<string, string>>({});
  const [postTypeOptions, setPostTypeOptions] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    page_name: "", page_title: "", display_in: "1", status: "1",
    slug: "", body: "", meta_keyword: "", meta_description: "",
    page_schema: "", menu_order: "1", posttype: posttype, parent_id: String(parentId),
  });
  const [pageImage, setPageImage] = useState<File | string | null>(null);
  const [metaImage, setMetaImage] = useState<File | string | null>(null);
  const [sections, setSections] = useState<ExtraSection[]>([]);
  const [deleteSectionTarget, setDeleteSectionTarget] = useState<{ id: number; index: number } | null>(null);
  const [deleteImageTarget, setDeleteImageTarget] = useState<{ id: number; field: string; index: number } | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_pages, { params: { per_page: 1 } });
        if (data.Page_Display_In_Array) setDisplayInOptions(data.Page_Display_In_Array);
        if (data.Status_Array) setStatusOptions(data.Status_Array);
        if (data.POST_TYPE_ARRAY) setPostTypeOptions(data.POST_TYPE_ARRAY);
      } catch { /* ignore */ }
    };

    if (!isEdit) {
      loadOptions();
      return;
    }
    (async () => {
      try {
        await loadOptions();
        const { data } = await apiClient.get(endpoints.admin_page_edit, { params: { id: pageId } });
        const rd = data.response_data;
        const p = rd.page;

        if (data.Page_Display_In_Array) setDisplayInOptions(data.Page_Display_In_Array);
        if (data.Status_Array) setStatusOptions(data.Status_Array);
        if (data.POST_TYPE_ARRAY) setPostTypeOptions(data.POST_TYPE_ARRAY);

        setForm({
          page_name: p.page_name || "", page_title: p.page_title || "",
          display_in: String(p.display_in ?? "1"), status: String(p.status ?? "1"),
          slug: p.slug || "", body: p.body || "",
          meta_keyword: p.meta_keyword || "", meta_description: p.meta_description || "",
          page_schema: p.page_schema || "", menu_order: String(p.menu_order || "1"),
          posttype: p.posttype || posttype, parent_id: String(p.parent_id || parentId),
        });

        setPageImage(p.image ? String(p.image) : null);
        setMetaImage(p.meta_image ? String(p.meta_image) : null);

        if (Array.isArray(p.sections)) {
          setSections(
            p.sections.map((s: Record<string, unknown>) => ({
              id: Number(s.id), section_type: String(s.section_type || "1"),
              title: String(s.title || ""), sub_title: String(s.sub_title || ""),
              body: String(s.body || ""),
              image: s.image ? String(s.image) : null,
              image2: s.image2 ? String(s.image2) : null,
              btn_url: String(s.btn_url || ""), btn_text: String(s.btn_text || ""),
            }))
          );
        }
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, pageId, parentId, posttype]);

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

  const handleDeleteSection = async () => {
    if (!deleteSectionTarget) return;
    const { id, index } = deleteSectionTarget;
    if (id) {
      try {
        await apiClient.delete(endpoints.admin_page_section_delete, { params: { id } });
        toast.success("Section deleted");
      } catch {
        toast.error("Failed to delete section");
        setDeleteSectionTarget(null);
        return;
      }
    }
    setSections((prev) => prev.filter((_, i) => i !== index));
    setDeleteSectionTarget(null);
  };

  const handleDeleteImage = async () => {
    if (!deleteImageTarget) return;
    const { id, field, index } = deleteImageTarget;
    try {
      await apiClient.delete(endpoints.admin_page_section_image_delete, { data: { id, image_field: field } });
      updateSection(index, field, null);
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    }
    setDeleteImageTarget(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (isEdit) fd.append("id", pageId!);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (pageImage instanceof File) fd.append("image", pageImage);
      if (metaImage instanceof File) fd.append("meta_image", metaImage);
      sections.forEach((s) => {
        if (s.id) fd.append("extra_id[]", String(s.id));
        fd.append("extra_section_type[]", s.section_type);
        fd.append("extra_title[]", s.title);
        fd.append("extra_sub_title[]", s.sub_title);
        fd.append("extra_body[]", s.body);
        fd.append("extra_btn_url[]", s.btn_url);
        fd.append("extra_btn_text[]", s.btn_text);
        if (s.image instanceof File) fd.append("extra_image[]", s.image);
        else fd.append("extra_image[]", "");
        if (s.image2 instanceof File) fd.append("extra_image2[]", s.image2);
        else fd.append("extra_image2[]", "");
      });

      const endpoint = isEdit ? endpoints.admin_page_update : endpoints.admin_page_add;
      await apiClient.post(endpoint, fd);
      toast.success(`${entityLabel} ${isEdit ? "updated" : "created"}`);
      refreshSidebar();
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
                {displayInOptions.length > 0
                  ? displayInOptions.map((label, i) => (
                    <option key={i} value={i}>{label}</option>
                  ))
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
                  ? Object.entries(statusOptions).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))
                  : <>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </>
                }
              </select>
            </div>
            <div>
              <label className={labelClass}>Post Type</label>
              <select className={inputClass} value={form.posttype} onChange={(e) => updateField("posttype", e.target.value)}>
                {Object.keys(postTypeOptions).length > 0
                  ? Object.entries(postTypeOptions).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))
                  : <>
                    <option value="page">Page</option>
                    <option value="service">Service</option>
                    <option value="project">Project</option>
                    <option value="company">Company</option>
                    <option value="technology">Technology</option>
                  </>
                }
              </select>
            </div>
            <div>
              <label className={labelClass}>Parent Page *</label>
              <ParentPageDropdown
                value={form.parent_id}
                onChange={(val) => updateField("parent_id", val)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Menu Order</label>
              <input type="number" className={inputClass} value={form.menu_order} onChange={(e) => updateField("menu_order", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Page Image</label>
              {typeof pageImage === "string" && pageImage ? (
                <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mb-2">
                  <img src={`${IMAGE_BASE_URL}${pageImage}`} alt="Page Image" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => setPageImage(null)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <input type="file" accept="image/*" className={inputClass} onChange={(e) => setPageImage(e.target.files?.[0] || null)} />
              )}
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
              {typeof metaImage === "string" && metaImage ? (
                <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mb-2">
                  <img src={`${IMAGE_BASE_URL}${metaImage}`} alt="Meta Image" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => setMetaImage(null)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <input type="file" accept="image/*" className={inputClass} onChange={(e) => setMetaImage(e.target.files?.[0] || null)} />
              )}
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

          {sections.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No extra sections</p>}

          {sections.map((section, i) => (
            <div key={section.id || i} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Section {i + 1}</span>
                <button type="button" onClick={() => setDeleteSectionTarget({ id: section.id || 0, index: i })} className="text-red-500 hover:text-red-700">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Section Type</label>
                  <input type="text" className={inputClass} placeholder="e.g. 1, 2, 3" value={section.section_type} onChange={(e) => updateSection(i, "section_type", e.target.value)} />
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
                  {typeof section.image === "string" && section.image ? (
                    <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mb-2">
                      <img src={`${IMAGE_BASE_URL}${section.image}`} alt="Section" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setDeleteImageTarget({ id: section.id!, field: "image", index: i })} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input type="file" accept="image/*" className={inputClass} onChange={(e) => updateSection(i, "image", e.target.files?.[0] || null)} />
                  )}
                </div>
                <div>
                  <label className={labelClass}>Image 2</label>
                  {typeof section.image2 === "string" && section.image2 ? (
                    <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mb-2">
                      <img src={`${IMAGE_BASE_URL}${section.image2}`} alt="Section 2" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setDeleteImageTarget({ id: section.id!, field: "image2", index: i })} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input type="file" accept="image/*" className={inputClass} onChange={(e) => updateSection(i, "image2", e.target.files?.[0] || null)} />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <label className={labelClass}>Body</label>
                <textarea className={inputClass} rows={3} value={section.body} onChange={(e) => updateSection(i, "body", e.target.value)} />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mb-4">
            <div />
            <button type="button" onClick={() => setSections((prev) => [...prev, { ...emptySection }])} className="flex items-center gap-1 text-sm bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg font-medium hover:bg-primary-100">
              <HiOutlinePlus className="w-4 h-4" /> Add Section
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm disabled:opacity-60">
            {submitting ? "Saving..." : isEdit ? `Update ${entityLabel}` : `Save ${entityLabel}`}
          </button>
        </div>
      </form>

      {deleteSectionTarget && (
        <DeleteModal itemName={`Section ${deleteSectionTarget.index + 1}`} entityLabel="Section" onConfirm={handleDeleteSection} onCancel={() => setDeleteSectionTarget(null)} />
      )}
      {deleteImageTarget && (
        <DeleteModal itemName={deleteImageTarget.field === "image" ? "Image" : "Image 2"} entityLabel="Image" onConfirm={handleDeleteImage} onCancel={() => setDeleteImageTarget(null)} />
      )}
    </AdminLayout>
  );
}
