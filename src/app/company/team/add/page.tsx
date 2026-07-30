"use client";

import AdminLayout from "@/components/AdminLayout";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddTeamMemberPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Team Member</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Company</span> / <span>Add Member</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Team member added!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input placeholder="Enter full name" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Role / Designation <span className="text-red-500">*</span></label>
              <input placeholder="e.g. Senior Developer" className={inputClass} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select className={inputClass}>
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
              <input type="email" placeholder="name@webtechnomind.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Bio</label>
            <textarea placeholder="Short bio about the team member" rows={4} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Profile Photo</label>
            <input type="file" accept="image/*" className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">Social Links</div>
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
          <div>
            <label className={labelClass}>Display Order</label>
            <input type="number" placeholder="1" className={`${inputClass} max-w-xs`} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Add Member</button>
          <button type="button" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all">Cancel</button>
        </div>
      </form>
    </AdminLayout>
  );
}
