"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface FAQ {
  question: string;
  answer: string;
}

interface Capability {
  title: string;
  description: string;
}

interface Framework {
  title: string;
  description: string;
}

interface Stat {
  label: string;
  value: string;
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm";

const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
      {title}
    </div>
  );
}

interface ServiceFormProps {
  initialData?: {
    parentService: string;
    subService: string;
    title: string;
    displayIn: string;
    slug: string;
    metaDescription: string;
    metaTitle: string;
    metaKeyword: string;
    schemaSection: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    bannerTitle: string;
    bannerDescription: string;
    status: string;
    quotationTitle: string;
    quotationDescription: string;
    technology: string;
  };
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const [form, setForm] = useState({
    parentService: initialData?.parentService ?? "Main Service",
    subService: initialData?.subService ?? "",
    title: initialData?.title ?? "",
    displayIn: initialData?.displayIn ?? "Header",
    slug: initialData?.slug ?? "",
    metaDescription: initialData?.metaDescription ?? "",
    metaTitle: initialData?.metaTitle ?? "",
    metaKeyword: initialData?.metaKeyword ?? "",
    schemaSection: initialData?.schemaSection ?? "",
    heroTitle: initialData?.heroTitle ?? "",
    heroSubtitle: initialData?.heroSubtitle ?? "",
    heroDescription: initialData?.heroDescription ?? "",
    heroImage: null as File | null,
    bannerTitle: initialData?.bannerTitle ?? "",
    bannerDescription: initialData?.bannerDescription ?? "",
    bannerImage: null as File | null,
    status: initialData?.status ?? "Active",
    quotationTitle: initialData?.quotationTitle ?? "",
    quotationDescription: initialData?.quotationDescription ?? "",
    technology: initialData?.technology ?? "",
  });

  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title"
        ? { slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }
        : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  function DynamicList<T extends Record<string, any>>({
    label,
    buttonLabel,
    items,
    setItems,
    fields,
  }: {
    label: string;
    buttonLabel: string;
    items: T[];
    setItems: (items: T[]) => void;
    fields: { key: keyof T; placeholder: string; type?: "textarea" }[];
  }) {
    return (
      <div className="space-y-3">
        <label className={labelClass}>{label}</label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1 space-y-2">
              {fields.map((f) =>
                f.type === "textarea" ? (
                  <textarea
                    key={String(f.key)}
                    value={String(item[f.key] ?? "")}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[i] = { ...updated[i], [f.key]: e.target.value };
                      setItems(updated);
                    }}
                    placeholder={f.placeholder}
                    rows={2}
                    className={inputClass}
                  />
                ) : (
                  <input
                    key={String(f.key)}
                    value={String(item[f.key] ?? "")}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[i] = { ...updated[i], [f.key]: e.target.value };
                      setItems(updated);
                    }}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setItems(items.filter((_, j) => j !== i))}
              className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const empty = {} as T;
            fields.forEach((f) => {
              (empty as Record<string, string>)[String(f.key)] = "";
            });
            setItems([...items, empty]);
          }}
          className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
        >
          <HiOutlinePlus className="w-4 h-4" /> {buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert(isEdit ? "Service updated!" : "Service created!");
      }}
    >
      {/* Top Fields */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Parent Service</label>
            <select name="parentService" value={form.parentService} onChange={handleChange} className={inputClass}>
              <option>Main Service</option>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Digital Marketing</option>
              <option>AI Solutions</option>
              <option>Cloud & DevOps</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Sub Service</label>
            <select name="subService" value={form.subService} onChange={handleChange} className={inputClass}>
              <option value="">Select Sub Service</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Full Stack</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Title <span className="text-red-500">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Enter Title" className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Display In</label>
            <select name="displayIn" value={form.displayIn} onChange={handleChange} className={inputClass}>
              <option>Header</option>
              <option>Footer</option>
              <option>Both</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Slug <span className="text-red-500">*</span></label>
            <input name="slug" value={form.slug} onChange={handleChange} placeholder="enter-slug" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Meta Description <span className="text-red-500">*</span></label>
            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} placeholder="Enter Description" rows={3} className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Meta title <span className="text-red-500">*</span></label>
            <input name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="enter-meta-title" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Meta Keyword <span className="text-red-500">*</span></label>
            <input name="metaKeyword" value={form.metaKeyword} onChange={handleChange} placeholder="Enter meta keyword" className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Schema Section</label>
          <textarea name="schemaSection" value={form.schemaSection} onChange={handleChange} rows={3} className={inputClass} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <SectionHeader title="Hero Section" />

        <div>
          <label className={labelClass}>Hero Title <span className="text-red-500">*</span></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Hero Title" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hero SubTitle <span className="text-red-500">*</span></label>
          <input name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange} placeholder="Hero Title" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hero Description <span className="text-red-500">*</span></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description" rows={4} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Hero Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "heroImage")} className={inputClass} />
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <SectionHeader title="Banner Section" />

        <div>
          <label className={labelClass}>Title</label>
          <input name="bannerTitle" value={form.bannerTitle} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="bannerDescription" value={form.bannerDescription} onChange={handleChange} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Banner Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "bannerImage")} className={inputClass} />
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={`${inputClass} max-w-xs`}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Service Quotation Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <SectionHeader title="Service Quotation Section" />

        <div>
          <label className={labelClass}>Service Quotation Title <span className="text-red-500">*</span></label>
          <input name="quotationTitle" value={form.quotationTitle} onChange={handleChange} placeholder="Enter Quotation Title" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Service Quotation Description <span className="text-red-500">*</span></label>
          <textarea name="quotationDescription" value={form.quotationDescription} onChange={handleChange} placeholder="Enter Quotation Description" rows={3} className={inputClass} />
        </div>
      </div>

      {/* Technology Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Technology Matrix</label>
          <select name="technology" value={form.technology} onChange={handleChange} className={inputClass}>
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

        {/* Institutional Capabilities */}
        <DynamicList
          label="Institutional Capabilities"
          buttonLabel="Add Capability"
          items={capabilities}
          setItems={setCapabilities}
          fields={[
            { key: "title", placeholder: "Capability Title" },
            { key: "description", placeholder: "Capability Description", type: "textarea" },
          ]}
        />

        {/* Faq Section */}
        <DynamicList
          label="Faq Section"
          buttonLabel="Add Faq"
          items={faqs}
          setItems={setFaqs}
          fields={[
            { key: "question", placeholder: "FAQ Question" },
            { key: "answer", placeholder: "FAQ Answer", type: "textarea" },
          ]}
        />

        {/* Execution Framework */}
        <DynamicList
          label="Execution Framework"
          buttonLabel="Add Framework"
          items={frameworks}
          setItems={setFrameworks}
          fields={[
            { key: "title", placeholder: "Framework Title" },
            { key: "description", placeholder: "Framework Description", type: "textarea" },
          ]}
        />

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
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-sm"
        >
          {isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
