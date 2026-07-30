"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const caseStudies = [
  { id: "1", title: "AI Chatbot for FinTech Startup", industry: "FinTech", service: "AI Chatbot", status: "Published" },
  { id: "2", title: "E-commerce Platform Migration", industry: "eCommerce", service: "Web App Dev", status: "Published" },
  { id: "3", title: "Healthcare App Development", industry: "Healthcare", service: "Mobile App Dev", status: "Draft" },
];

const columns = [
  { key: "title" as const, label: "Title", sortable: true },
  { key: "industry" as const, label: "Industry", sortable: true },
  { key: "service" as const, label: "Service" },
  {
    key: "status" as const,
    label: "Status",
    render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {row.status as string}
      </span>
    ),
  },
];

export default function CaseStudiesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Case Studies" buttonLabel="Add Case Study" buttonHref="/portfolio/case-studies/add" />
      <DataTable data={caseStudies} columns={columns} onEdit={(item) => alert(`Edit ${item.title}`)} onDelete={(item) => alert(`Delete ${item.title}`)} />
    </AdminLayout>
  );
}
