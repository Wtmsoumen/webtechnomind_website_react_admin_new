"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddPortfolioPage() {
  const [technologies, setTechnologies] = useState<string[]>([""]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Portfolio Project</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Portfolio</span> / <span>Add Project</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Project created!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Project Name <span className="text-red-500">*</span></label>
              <input placeholder="Enter project name" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Client Name</label>
              <input placeholder="Enter client name" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <select className={inputClass}>
                <option>Web App</option>
                <option>Mobile App</option>
                <option>E-commerce</option>
                <option>AI/ML</option>
                <option>WordPress</option>
                <option>SaaS</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Industry</label>
              <select className={inputClass}>
                <option>FinTech</option>
                <option>Healthcare</option>
                <option>eCommerce</option>
                <option>Logistics</option>
                <option>SaaS</option>
                <option>Real Estate</option>
                <option>Education</option>
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
            <input placeholder="project-slug" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Short Description <span className="text-red-500">*</span></label>
            <textarea placeholder="Brief description of the project" rows={3} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Full Description</label>
            <textarea placeholder="Detailed project description" rows={5} className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">Media</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Thumbnail Image</label>
              <input type="file" accept="image/*" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Cover Image</label>
              <input type="file" accept="image/*" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Project URL</label>
            <input type="url" placeholder="https://example.com" className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">Technologies Used</div>
          {technologies.map((tech, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input value={tech} onChange={(e) => { const u = [...technologies]; u[i] = e.target.value; setTechnologies(u); }} placeholder="e.g. React, Node.js, Python" className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => setTechnologies(technologies.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><HiOutlineTrash className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={() => setTechnologies([...technologies, ""])} className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all">
            <HiOutlinePlus className="w-4 h-4" /> Add Technology
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">SEO</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input placeholder="Meta title" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input placeholder="keyword1, keyword2" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea placeholder="Meta description" rows={3} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Create Project</button>
          <button type="button" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all">Cancel</button>
        </div>
      </form>
    </AdminLayout>
  );
}
