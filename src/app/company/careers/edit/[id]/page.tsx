"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockJobs: Record<string, { title: string; department: string; type: string; status: string; description: string; requirements: string }> = {
  "1": { title: "Senior React Developer", department: "Engineering", type: "Full-time", status: "Open", description: "We are looking for a skilled React developer...", requirements: "5+ years experience in React, TypeScript..." },
  "2": { title: "AI/ML Engineer", department: "AI Solutions", type: "Full-time", status: "Open", description: "Exciting opportunity in AI/ML...", requirements: "3+ years experience in Python, TensorFlow..." },
};

export default function EditCareerPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockJobs[id] ?? mockJobs["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Job Post</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Company</span> /{" "}
          <Link href="/company/careers" className="text-primary-500 hover:underline">Careers</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Job post updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Job Details</div>
          <div>
            <label className={labelClass}>Job Title <span className="text-red-500">*</span></label>
            <input defaultValue={data.title} className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select className={inputClass} defaultValue={data.department}>
                <option>Engineering</option><option>AI Solutions</option><option>Marketing</option>
                <option>Design</option><option>Mobile</option><option>HR</option><option>Management</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Employment Type</label>
              <select className={inputClass} defaultValue={data.type}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} defaultValue={data.status}>
                <option>Open</option><option>Closed</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Job Description <span className="text-red-500">*</span></label>
            <textarea defaultValue={data.description} rows={5} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Requirements</label>
            <textarea defaultValue={data.requirements} rows={5} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/company/careers" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
