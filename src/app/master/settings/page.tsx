"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    siteName: "Webtechnomind IT Solutions",
    email: "info@webtechnomind.com",
    phone: "+91-9876543210",
    address: "Noida, UP, India",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    metaTitle: "Webtechnomind IT Solutions",
    metaDescription: "AI Solutions, Software Development & Digital Marketing",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AdminLayout>
      <PageHeader title="Settings" />
      <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Settings saved!"); }}>
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "siteName", label: "Site Name" },
              { name: "email", label: "Email" },
              { name: "phone", label: "Phone" },
              { name: "address", label: "Address" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input name={f.name} value={(form as Record<string, string>)[f.name]} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["facebook", "twitter", "linkedin", "instagram"].map((name) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{name}</label>
                <input name={name} value={(form as Record<string, string>)[name]} onChange={handleChange} placeholder={`https://${name}.com/...`} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">SEO</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
            <input name="metaTitle" value={form.metaTitle} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
          </div>

          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all">
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
