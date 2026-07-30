"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface FAQ {
  question: string;
  answer: string;
}

interface Stat {
  label: string;
  value: string;
}

interface WhyChooseUs {
  title: string;
  description: string;
}

interface PageSection {
  title: string;
  content: string;
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";

const selectClass = inputClass;

const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
      {title}
    </div>
  );
}

export default function AddMenuPage() {
  const [form, setForm] = useState({
    parentMenu: "Main Menu",
    menuName: "",
    menuSlug: "",
    displayIn: "Header",
    metaTitle: "",
    metaKeyword: "",
    type: "Page",
    metaDescription: "",
    schemaSection: "",
    heroTitle: "",
    heroImage: null as File | null,
    heroDescription: "",
    bannerTitle: "",
    bannerDescription: "",
    bannerImage: null as File | null,
    menuQuotationTitle: "",
    menuQuotationDescription: "",
    status: "Active",
    faqTitle: "",
    faqSubtitle: "",
    faqImage: null as File | null,
    technology: "",
  });

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([]);
  const [pageSections, setPageSections] = useState<PageSection[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "menuName"
        ? { menuSlug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }
        : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  return (
    <AdminLayout>
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Menu</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 hover:underline cursor-pointer">Home</span>
          <span className="mx-1">/</span>
          <span>Add Menu</span>
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Menu created!");
        }}
      >
        {/* Menu Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Menu Information" />

          <div>
            <label className={labelClass}>Parent Menu</label>
            <select name="parentMenu" value={form.parentMenu} onChange={handleChange} className={selectClass}>
              <option>Main Menu</option>
              <option>Services</option>
              <option>Ai Solutions</option>
              <option>Technologies</option>
              <option>Industry</option>
              <option>Company</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                Menu Name <span className="text-red-500">*</span>
              </label>
              <input
                name="menuName"
                value={form.menuName}
                onChange={handleChange}
                placeholder="Enter Menu Name"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Menu Slug <span className="text-red-500">*</span>
              </label>
              <input
                name="menuSlug"
                value={form.menuSlug}
                onChange={handleChange}
                placeholder="enter-menu-slug"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Display In</label>
              <select name="displayIn" value={form.displayIn} onChange={handleChange} className={selectClass}>
                <option>Header</option>
                <option>Footer</option>
                <option>Both</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input name="metaTitle" value={form.metaTitle} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Meta Keyword</label>
              <input
                name="metaKeyword"
                value={form.metaKeyword}
                onChange={handleChange}
                placeholder="Enter Meta Keyword"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select name="type" value={form.type} onChange={handleChange} className={selectClass}>
                <option>Page</option>
                <option>Service</option>
                <option>Technology</option>
                <option>Industry</option>
                <option>Company</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="Enter Meta Description"
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Schema Section</label>
            <textarea
              name="schemaSection"
              value={form.schemaSection}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Hero Section" />

          <div>
            <label className={labelClass}>Hero Title</label>
            <input
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              placeholder="Enter Hero Title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "heroImage")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero Description</label>
            <textarea
              name="heroDescription"
              value={form.heroDescription}
              onChange={handleChange}
              placeholder="Enter Hero Description"
              rows={4}
              className={inputClass}
            />
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Banner Section" />

          <div>
            <label className={labelClass}>Banner Title</label>
            <input
              name="bannerTitle"
              value={form.bannerTitle}
              onChange={handleChange}
              placeholder="Enter Banner Title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Banner Description</label>
            <textarea
              name="bannerDescription"
              value={form.bannerDescription}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "bannerImage")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Menu Quotation Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Menu Quotation Section" />

          <div>
            <label className={labelClass}>Menu Quotation Title</label>
            <input
              name="menuQuotationTitle"
              value={form.menuQuotationTitle}
              onChange={handleChange}
              placeholder="Enter Menu Quotation Title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Menu Quotation Description</label>
            <textarea
              name="menuQuotationDescription"
              value={form.menuQuotationDescription}
              onChange={handleChange}
              placeholder="Enter Menu Quotation Description"
              rows={3}
              className={inputClass}
            />
          </div>
        </div>

        {/* Menu Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Menu Settings" />

          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={selectClass}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="FAQ Section" />

          <div>
            <label className={labelClass}>FAQ Title</label>
            <input
              name="faqTitle"
              value={form.faqTitle}
              onChange={handleChange}
              placeholder="Enter FAQ Title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>FAQ Subtitle</label>
            <input
              name="faqSubtitle"
              value={form.faqSubtitle}
              onChange={handleChange}
              placeholder="Enter FAQ Subtitle"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>FAQ Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "faqImage")}
              className={inputClass}
            />
          </div>

          {/* Dynamic FAQs */}
          <div className="space-y-3">
            <label className={labelClass}>Add Faq</label>
            {faqs.map((faq, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <input
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[i].question = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="FAQ Question"
                    className={inputClass}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[i].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="FAQ Answer"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                  className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
              className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              <HiOutlinePlus className="w-4 h-4" /> Add Faq
            </button>
          </div>

          {/* Technology */}
          <div>
            <label className={labelClass}>Technology</label>
            <select name="technology" value={form.technology} onChange={handleChange} className={selectClass}>
              <option value="">Select Core Technology</option>
              <option>React</option>
              <option>Next.js</option>
              <option>Node.js</option>
              <option>Python</option>
              <option>Angular</option>
              <option>Vue.js</option>
              <option>Flutter</option>
              <option>React Native</option>
            </select>
          </div>

          {/* Stats Section */}
          <div className="space-y-3">
            <label className={labelClass}>Stats Section</label>
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  value={stat.label}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[i].label = e.target.value;
                    setStats(updated);
                  }}
                  placeholder="Label (e.g. Projects Completed)"
                  className={`${inputClass} flex-1`}
                />
                <input
                  value={stat.value}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[i].value = e.target.value;
                    setStats(updated);
                  }}
                  placeholder="Value (e.g. 500+)"
                  className={`${inputClass} w-40`}
                />
                <button
                  type="button"
                  onClick={() => setStats(stats.filter((_, j) => j !== i))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setStats([...stats, { label: "", value: "" }])}
              className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              <HiOutlinePlus className="w-4 h-4" /> Add Stats
            </button>
          </div>

          {/* Why Choose Us Section */}
          <div className="space-y-3">
            <label className={labelClass}>Why Choose Us Section</label>
            {whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...whyChooseUs];
                      updated[i].title = e.target.value;
                      setWhyChooseUs(updated);
                    }}
                    placeholder="Title"
                    className={inputClass}
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...whyChooseUs];
                      updated[i].description = e.target.value;
                      setWhyChooseUs(updated);
                    }}
                    placeholder="Description"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setWhyChooseUs(whyChooseUs.filter((_, j) => j !== i))}
                  className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setWhyChooseUs([...whyChooseUs, { title: "", description: "" }])}
              className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              <HiOutlinePlus className="w-4 h-4" /> Add Why Choose Us
            </button>
          </div>
        </div>

        {/* Page Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <SectionHeader title="Page Sections" />

          {pageSections.map((section, i) => (
            <div key={i} className="flex gap-3 items-start border border-gray-200 rounded-lg p-4">
              <div className="flex-1 space-y-2">
                <input
                  value={section.title}
                  onChange={(e) => {
                    const updated = [...pageSections];
                    updated[i].title = e.target.value;
                    setPageSections(updated);
                  }}
                  placeholder="Section Title"
                  className={inputClass}
                />
                <textarea
                  value={section.content}
                  onChange={(e) => {
                    const updated = [...pageSections];
                    updated[i].content = e.target.value;
                    setPageSections(updated);
                  }}
                  placeholder="Section Content"
                  rows={3}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => setPageSections(pageSections.filter((_, j) => j !== i))}
                className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <HiOutlineTrash className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPageSections([...pageSections, { title: "", content: "" }])}
            className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
          >
            <HiOutlinePlus className="w-4 h-4" /> Add Section
          </button>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm"
          >
            Create
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
