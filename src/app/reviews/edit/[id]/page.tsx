"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockReviews: Record<string, { name: string; company: string; role: string; rating: string; review: string; status: string }> = {
  "1": { name: "John Smith", company: "Acme Corp", role: "CEO", rating: "5", review: "Excellent service!", status: "Active" },
  "2": { name: "Jane Doe", company: "Beta Ltd", role: "CTO", rating: "4", review: "Very good team.", status: "Active" },
};

export default function EditReviewPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockReviews[id] ?? mockReviews["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Review</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Reviews</span> /{" "}
          <Link href="/reviews" className="text-primary-500 hover:underline">All Reviews</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Review updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Reviewer Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Full Name <span className="text-red-500">*</span></label><input defaultValue={data.name} className={inputClass} required /></div>
            <div><label className={labelClass}>Company</label><input defaultValue={data.company} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Role / Designation</label><input defaultValue={data.role} className={inputClass} /></div>
            <div>
              <label className={labelClass}>Rating <span className="text-red-500">*</span></label>
              <select className={inputClass} defaultValue={data.rating}>
                <option value="5">⭐⭐⭐⭐⭐ (5)</option><option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option><option value="2">⭐⭐ (2)</option><option value="1">⭐ (1)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} defaultValue={data.status}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Review Text <span className="text-red-500">*</span></label><textarea defaultValue={data.review} rows={5} className={inputClass} required /></div>
          <div>
            <label className={labelClass}>Reviewer Photo</label>
            <input type="file" accept="image/*" className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Leave empty to keep current photo.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/reviews" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
