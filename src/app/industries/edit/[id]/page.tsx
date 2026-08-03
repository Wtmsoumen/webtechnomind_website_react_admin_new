"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockIndustries: Record<string, { name: string; slug: string; status: string; projects: number; description: string }> = {
  "1": { name: "FinTech", slug: "fintech", status: "Active", projects: 12, description: "Financial technology solutions." },
  "2": { name: "Healthcare", slug: "healthcare", status: "Active", projects: 8, description: "Healthcare IT solutions." },
};

export default function EditIndustryPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockIndustries[id] ?? mockIndustries["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Industry</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Industries</span> /{" "}
          <Link href="/industries" className="text-primary-500 hover:underline">All Industries</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Industry updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Industry Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Industry Name <span className="text-red-500">*</span></label><input defaultValue={data.name} className={inputClass} required /></div>
            <div><label className={labelClass}>Slug</label><input defaultValue={data.slug} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Status</label><select className={inputClass} defaultValue={data.status}><option>Active</option><option>Inactive</option></select></div>
            <div><label className={labelClass}>Projects Count</label><input type="number" defaultValue={data.projects} min={0} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Description</label><textarea defaultValue={data.description} rows={4} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Industry Icon / Image</label>
            <input type="file" accept="image/*" className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Leave empty to keep current icon.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/industries" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
