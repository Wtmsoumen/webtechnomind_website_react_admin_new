"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function SettingsPage() {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_Image_URL || "";
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    website_name: "",
    phone: "",
    email: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    india_office_address: "",
    dubai_office_address: "",
    usa_office_address: "",
  });
  const [siteLogo, setSiteLogo] = useState<File | null>(null);
  const [siteLogoUrl, setSiteLogoUrl] = useState("");
  const [siteFavicon, setSiteFavicon] = useState<File | null>(null);
  const [siteFaviconUrl, setSiteFaviconUrl] = useState("");
  const [siteFooterLogo, setSiteFooterLogo] = useState<File | null>(null);
  const [siteFooterLogoUrl, setSiteFooterLogoUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_settings);
        const s = data.response_data || data;
        setForm({
          website_name: s.website_name || "",
          phone: s.phone || s.site_phone || "",
          email: s.email || "",
          meta_title: s.meta_title || "",
          meta_keyword: s.meta_keyword || "",
          meta_description: s.meta_description || "",
          india_office_address: s.india_office_address || s.site_address || "",
          dubai_office_address: s.dubai_office_address || "",
          usa_office_address: s.usa_office_address || "",
        });
        if (s.site_logo) setSiteLogoUrl(s.site_logo);
        if (s.site_favicon) setSiteFaviconUrl(s.site_favicon);
        if (s.site_footer_logo) setSiteFooterLogoUrl(s.site_footer_logo);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (siteLogo) fd.append("site_logo", siteLogo);
      if (siteFavicon) fd.append("site_favicon", siteFavicon);
      if (siteFooterLogo) fd.append("site_footer_logo", siteFooterLogo);
      await apiClient.post(endpoints.admin_settings, fd);
      toast.success("Settings updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <PageHeader title="Settings" />
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader title="Settings" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Website Name</label>
                <input type="text" className={inputClass} value={form.website_name} onChange={(e) => updateField("website_name", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="text" className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Meta</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Meta Title</label>
                <input type="text" className={inputClass} value={form.meta_title} onChange={(e) => updateField("meta_title", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Meta Keywords</label>
                <input type="text" className={inputClass} value={form.meta_keyword} onChange={(e) => updateField("meta_keyword", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Meta Description</label>
                <textarea rows={3} className={inputClass} value={form.meta_description} onChange={(e) => updateField("meta_description", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Addresses</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>India Office Address</label>
                <textarea rows={2} className={inputClass} value={form.india_office_address} onChange={(e) => updateField("india_office_address", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Dubai Office Address</label>
                <textarea rows={2} className={inputClass} value={form.dubai_office_address} onChange={(e) => updateField("dubai_office_address", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>USA Office Address</label>
                <textarea rows={2} className={inputClass} value={form.usa_office_address} onChange={(e) => updateField("usa_office_address", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Site Logo</label>
                {siteLogoUrl && !siteLogo && (
                  <div className="relative group w-32 h-20 rounded-lg overflow-hidden border border-gray-200 mb-2 bg-gray-50 flex items-center justify-center">
                    <img src={`${IMAGE_BASE_URL}${siteLogoUrl}`} alt="Logo" className="max-w-full max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => setSiteLogoUrl("")} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                <input type="file" accept="image/*" className={inputClass} onChange={(e) => setSiteLogo(e.target.files?.[0] || null)} />
              </div>
              <div>
                <label className={labelClass}>Site Favicon</label>
                {siteFaviconUrl && !siteFavicon && (
                  <div className="relative group w-16 h-16 rounded-lg overflow-hidden border border-gray-200 mb-2 bg-gray-50 flex items-center justify-center">
                    <img src={`${IMAGE_BASE_URL}${siteFaviconUrl}`} alt="Favicon" className="max-w-full max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => setSiteFaviconUrl("")} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                <input type="file" accept="image/*" className={inputClass} onChange={(e) => setSiteFavicon(e.target.files?.[0] || null)} />
              </div>
              <div>
                <label className={labelClass}>Site Footer Logo</label>
                {siteFooterLogoUrl && !siteFooterLogo && (
                  <div className="relative group w-32 h-20 rounded-lg overflow-hidden border border-gray-200 mb-2 bg-gray-50 flex items-center justify-center">
                    <img src={`${IMAGE_BASE_URL}${siteFooterLogoUrl}`} alt="Footer Logo" className="max-w-full max-h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => setSiteFooterLogoUrl("")} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                <input type="file" accept="image/*" className={inputClass} onChange={(e) => setSiteFooterLogo(e.target.files?.[0] || null)} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" disabled={submitting} className="px-8 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium text-sm hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm disabled:opacity-60">
            {submitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
