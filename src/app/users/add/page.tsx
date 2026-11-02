"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";

const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500";
const labelClass = "mb-1 block text-sm font-semibold text-gray-700";

export default function AddUserPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    role_id: "",
    status: "1",
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    payload.append("profile_photo", profilePhoto ?? "");

    try {
      await apiClient.post(endpoints.admin_user_add, payload);
      toast.success("User added");
      router.push("/users");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Add User" />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">User details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Name <span className="text-red-500">*</span></label>
              <input id="name" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="mobile">Mobile <span className="text-red-500">*</span></label>
              <input id="mobile" name="mobile" type="tel" autoComplete="tel" value={form.mobile} onChange={(event) => updateField("mobile", event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="role_id">Role ID <span className="text-red-500">*</span></label>
              <input id="role_id" name="role_id" type="number" min="1" step="1" value={form.role_id} onChange={(event) => updateField("role_id", event.target.value)} className={inputClass} required />
              <p className="mt-1 text-xs text-gray-500">Enter the ID of the role assigned to this user.</p>
            </div>
            <div>
              <label className={labelClass} htmlFor="password">Password <span className="text-red-500">*</span></label>
              <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={(event) => updateField("password", event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="password_confirmation">Confirm password <span className="text-red-500">*</span></label>
              <input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" value={form.password_confirmation} onChange={(event) => updateField("password_confirmation", event.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="status">Status <span className="text-red-500">*</span></label>
              <select id="status" name="status" value={form.status} onChange={(event) => updateField("status", event.target.value)} className={inputClass}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="profile_photo">Profile photo</label>
              <input id="profile_photo" name="profile_photo" type="file" accept="image/*" onChange={(event) => setProfilePhoto(event.target.files?.[0] ?? null)} className={inputClass} />
            </div>
          </div>
        </section>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-600 hover:to-accent-600 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Adding user…" : "Add User"}
          </button>
          <button type="button" onClick={() => router.back()} disabled={submitting} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60">Cancel</button>
        </div>
      </form>
    </AdminLayout>
  );
}
