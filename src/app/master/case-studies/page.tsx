"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { sampleCaseStudies } from "@/lib/sampleData";

const columns = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "client", label: "Client" },
  { key: "industry", label: "Industry" },
  {
    key: "status",
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
        {String(row.status)}
      </span>
    ),
  },
];

export default function CaseStudiesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Case Study List" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable columns={columns} data={sampleCaseStudies as unknown as Record<string, unknown>[]} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </AdminLayout>
  );
}
