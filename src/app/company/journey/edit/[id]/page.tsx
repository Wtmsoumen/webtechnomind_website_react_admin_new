"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

// Mock data — replace with API call using params.id
const mockData: Record<string, { year: string; month: string; title: string; description: string; category: string; order: string; icon: string; status: string; highlighted: string }> = {
  "1": { year: "2018", month: "", title: "Company Founded", description: "Webtechnomind IT Solutions started with a vision to deliver innovative IT solutions.", category: "Founding", order: "1", icon: "🚀", status: "Published", highlighted: "yes" },
  "2": { year: "2019", month: "", title: "First Major Client", description: "Secured first enterprise client and expanded the team to 15 members.", category: "Growth", order: "2", icon: "🤝", status: "Published", highlighted: "no" },
};

export default function EditMilestonePage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockData[id] ?? mockData["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Milestone</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Company</span> /{" "}
          <Link href="/company/journey" className="text-primary-500 hover:underline">
            Company Journey
          </Link>{" "}
          / <span>Edit Milestone</span>
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Milestone updated!");
        }}
      >
        {/* Milestone Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            Milestone Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                defaultValue={data.year}
                min={2000}
                max={2100}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Month (Optional)</label>
              <select className={inputClass} defaultValue={data.month}>
                <option value="">— Select Month —</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Milestone Title <span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={data.title}
              placeholder="e.g. Company Founded"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              defaultValue={data.description}
              placeholder="Describe this milestone in detail..."
              rows={4}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} defaultValue={data.category}>
                <option>Founding</option>
                <option>Growth</option>
                <option>Awards</option>
                <option>Product Launch</option>
                <option>Partnership</option>
                <option>Expansion</option>
                <option>Team</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                defaultValue={data.order}
                min={1}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">
            Media (Optional)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Replace Milestone Image</label>
              <input type="file" accept="image/*" className={inputClass} />
              <p className="text-xs text-gray-400 mt-1">
                Leave empty to keep the current image. JPG/PNG, max 5MB.
              </p>
            </div>
            <div>
              <label className={labelClass}>Icon / Emoji</label>
              <input
                defaultValue={data.icon}
                placeholder="e.g. 🚀 or a FontAwesome class"
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                Optional emoji or icon identifier for the timeline.
              </p>
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
              <select className={inputClass} defaultValue={data.status}>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Highlight as Key Milestone</label>
              <select className={inputClass} defaultValue={data.highlighted}>
                <option value="no">No</option>
                <option value="yes">Yes — Show prominently</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm"
          >
            Save Changes
          </button>
          <Link
            href="/company/journey"
            className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
}
