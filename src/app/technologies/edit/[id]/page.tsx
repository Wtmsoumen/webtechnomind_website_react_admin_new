"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockTechs: Record<string, { name: string; category: string; status: string }> = {
  "1": { name: "React", category: "Frontend", status: "Active" },
  "2": { name: "Next.js", category: "Frontend", status: "Active" },
  "3": { name: "Node.js", category: "Backend", status: "Active" },
  "4": { name: "Python", category: "AI/ML", status: "Active" },
};

export default function EditTechnologyPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockTechs[id] ?? mockTechs["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Technology</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Technologies</span> /{" "}
          <Link href="/technologies" className="text-primary-500 hover:underline">Technology List</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Technology updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Technology Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Technology Name <span className="text-red-500">*</span></label><input defaultValue={data.name} className={inputClass} required /></div>
            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <select className={inputClass} defaultValue={data.category}>
                <option>Frontend</option><option>Backend</option><option>Mobile</option>
                <option>AI/ML</option><option>Cloud</option><option>Database</option><option>DevOps</option><option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Status</label><select className={inputClass} defaultValue={data.status}><option>Active</option><option>Inactive</option></select></div>
            <div><label className={labelClass}>Display Order</label><input type="number" min={1} className={inputClass} /></div>
          </div>
          <div>
            <label className={labelClass}>Replace Icon / Logo</label>
            <input type="file" accept="image/*,.svg" className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">SVG, PNG recommended. Leave empty to keep current icon.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/technologies" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
