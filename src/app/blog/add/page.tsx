"use client";

import AdminLayout from "@/components/AdminLayout";

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function AddBlogPostPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Blog Post</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Blog</span> / <span>Add Post</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Blog post created!"); }}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label className={labelClass}>Title <span className="text-red-500">*</span></label>
            <input placeholder="Enter blog post title" className={inputClass} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Category <span className="text-red-500">*</span></label>
              <select className={inputClass}>
                <option>AI</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Digital Marketing</option>
                <option>SEO</option>
                <option>Technology</option>
                <option>Business</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input defaultValue="Admin" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input placeholder="blog-post-slug" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Excerpt <span className="text-red-500">*</span></label>
            <textarea placeholder="Short summary of the blog post" rows={3} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Content <span className="text-red-500">*</span></label>
            <textarea placeholder="Write your blog content here..." rows={12} className={inputClass} required />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit">Media & SEO</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Featured Image</label>
              <input type="file" accept="image/*" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tags</label>
              <input placeholder="tag1, tag2, tag3" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input placeholder="Meta title for SEO" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input placeholder="keyword1, keyword2" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea placeholder="Meta description for SEO" rows={3} className={inputClass} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm">Publish Post</button>
          <button type="button" className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all">Save as Draft</button>
        </div>
      </form>
    </AdminLayout>
  );
}
