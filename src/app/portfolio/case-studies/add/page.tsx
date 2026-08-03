"use client";

import AdminLayout from "@/components/AdminLayout";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddCaseStudyPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Case Study</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Portfolio</span> / <span>Add Case Study</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Case study created!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title <span className="text-red-500">*</span></label>
              <input placeholder="Enter case study title" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Client</label>
              <input placeholder="Enter client name" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Industry</label>
              <select className={inputClass}>
                <option>FinTech</option>
                <option>Healthcare</option>
                <option>eCommerce</option>
                <option>Logistics</option>
                <option>SaaS</option>
                <option>Education</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Service</label>
              <select className={inputClass}>
                <option>AI Chatbot</option>
                <option>Web App Dev</option>
                <option>Mobile App Dev</option>
                <option>Digital Marketing</option>
                <option>E-commerce Dev</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input placeholder="case-study-slug" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea placeholder="Brief overview of the case study" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Challenge</label>
            <textarea placeholder="Describe the challenge faced" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Solution</label>
            <textarea placeholder="Describe the solution delivered" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Results</label>
            <textarea placeholder="Describe the results achieved" rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Featured Image</label>
            <input type="file" accept="image/*" className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">SEO</div>
          <div>
            <label className={labelClass}>Meta Title</label>
            <input placeholder="Meta title" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea placeholder="Meta description" rows={3} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Create Case Study</button>
          <button type="button" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all">Cancel</button>
        </div>
      </form>
    </AdminLayout>
  );
}
