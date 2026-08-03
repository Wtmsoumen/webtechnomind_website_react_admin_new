"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddGalleryPhotoPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Gallery Photo</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Company</span> /{" "}
          <Link href="/company/gallery" className="text-primary-500 hover:underline">
            Gallery
          </Link>{" "}
          / <span>Add Photo</span>
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Gallery photo added!");
        }}
      >
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            Photo Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Title <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="e.g. Team Outing 2024"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <select className={inputClass}>
                <option>Events</option>
                <option>Office</option>
                <option>Work</option>
                <option>Awards</option>
                <option>Celebrations</option>
                <option>Team</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Caption</label>
            <input
              placeholder="Short caption for the photo"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Alt Text</label>
            <input
              placeholder="Descriptive alt text for accessibility"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className={inputClass}
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Recommended: JPG or PNG, max 5MB
              </p>
            </div>
            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                placeholder="1"
                min={1}
                className={`${inputClass} max-w-xs`}
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            Visibility
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Featured</label>
              <select className={inputClass}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm"
          >
            Add Photo
          </button>
          <Link
            href="/company/gallery"
            className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
}
