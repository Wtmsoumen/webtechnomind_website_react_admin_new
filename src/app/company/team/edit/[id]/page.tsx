"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockTeam: Record<string, { name: string; role: string; department: string; email: string; status: string; bio: string }> = {
  "1": { name: "John Doe", role: "CEO & Founder", department: "Leadership", email: "john@webtechnomind.com", status: "Active", bio: "Experienced tech leader." },
  "2": { name: "Jane Smith", role: "CTO", department: "Technology", email: "jane@webtechnomind.com", status: "Active", bio: "Expert in AI and cloud." },
};

export default function EditTeamMemberPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockTeam[id] ?? mockTeam["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Team Member</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Company</span> /{" "}
          <Link href="/company/team" className="text-primary-500 hover:underline">Team</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Team member updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input defaultValue={data.name} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Role / Designation <span className="text-red-500">*</span></label>
              <input defaultValue={data.role} className={inputClass} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select className={inputClass} defaultValue={data.department}>
                <option>Leadership</option>
                <option>Engineering</option>
                <option>AI Solutions</option>
                <option>Marketing</option>
                <option>Design</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" defaultValue={data.email} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} defaultValue={data.status}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Bio</label>
            <textarea defaultValue={data.bio} rows={4} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Profile Photo</label>
            <input type="file" accept="image/*" className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Leave empty to keep current photo.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Social Links</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input type="url" placeholder="https://linkedin.com/in/..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>GitHub</label>
              <input type="url" placeholder="https://github.com/..." className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/company/team" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
