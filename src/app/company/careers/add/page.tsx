"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddJobPostPage() {
  const [requirements, setRequirements] = useState<string[]>([""]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Job Post</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Careers</span> / <span>Add Job</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Job post created!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label className={labelClass}>Job Title <span className="text-red-500">*</span></label>
            <input placeholder="e.g. Senior React Developer" className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select className={inputClass}>
                <option>Engineering</option>
                <option>AI Solutions</option>
                <option>Mobile</option>
                <option>Marketing</option>
                <option>Design</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select className={inputClass}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Experience</label>
              <select className={inputClass}>
                <option>0-1 years</option>
                <option>1-3 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input defaultValue="Kolkata, India" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Job Description <span className="text-red-500">*</span></label>
            <textarea placeholder="Detailed job description" rows={6} className={inputClass} required />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">Requirements</div>
          {requirements.map((req, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input value={req} onChange={(e) => { const u = [...requirements]; u[i] = e.target.value; setRequirements(u); }} placeholder="e.g. 3+ years React experience" className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => setRequirements(requirements.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><HiOutlineTrash className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => setRequirements([...requirements, ""])} className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Requirement
          </button>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Publish Job</button>
          <button type="button" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all">Cancel</button>
        </div>
      </form>
    </AdminLayout>
  );
}
