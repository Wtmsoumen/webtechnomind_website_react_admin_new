"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useParams } from "next/navigation";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

const mockPosts: Record<string, { title: string; category: string; author: string; status: string; slug: string; excerpt: string; content: string }> = {
  "1": { title: "How to Improve Brand Visibility in AI Search Engines", category: "AI", author: "Admin", status: "Published", slug: "brand-visibility-ai", excerpt: "Short excerpt...", content: "Full content here..." },
  "2": { title: "5 Practical AI Solutions That Deliver Real ROI for SMEs", category: "AI", author: "Admin", status: "Published", slug: "ai-roi-smes", excerpt: "", content: "" },
};

export default function EditBlogPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const data = mockPosts[id] ?? mockPosts["1"];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Blog</span> /{" "}
          <Link href="/blog" className="text-primary-500 hover:underline">All Posts</Link> /{" "}
          <span>Edit</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Blog post updated!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label className={labelClass}>Title <span className="text-red-500">*</span></label>
            <input defaultValue={data.title} className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <select className={inputClass} defaultValue={data.category}>
                <option>AI</option><option>Web Development</option><option>Mobile Development</option>
                <option>Digital Marketing</option><option>SEO</option><option>Technology</option><option>Business</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input defaultValue={data.author} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} defaultValue={data.status}>
                <option>Draft</option><option>Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input defaultValue={data.slug} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Excerpt <span className="text-red-500">*</span></label>
            <textarea defaultValue={data.excerpt} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Content <span className="text-red-500">*</span></label>
            <textarea defaultValue={data.content} rows={12} className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Media & SEO</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Replace Featured Image</label>
              <input type="file" accept="image/*" className={inputClass} />
              <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image.</p>
            </div>
            <div>
              <label className={labelClass}>Tags</label>
              <input placeholder="tag1, tag2, tag3" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Meta Title</label><input className={inputClass} /></div>
            <div><label className={labelClass}>Meta Keywords</label><input className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Meta Description</label><textarea rows={3} className={inputClass} /></div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Save Changes</button>
          <Link href="/blog" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all inline-flex items-center">Cancel</Link>
        </div>
      </form>
    </AdminLayout>
  );
}
