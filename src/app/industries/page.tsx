"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const industries = [
  { id: "1", name: "FinTech", slug: "fintech", status: "Active", projects: 12 },
  { id: "2", name: "Healthcare", slug: "healthcare", status: "Active", projects: 8 },
  { id: "3", name: "eCommerce", slug: "ecommerce", status: "Active", projects: 15 },
  { id: "4", name: "Logistics", slug: "logistics", status: "Active", projects: 6 },
  { id: "5", name: "SaaS", slug: "saas", status: "Active", projects: 10 },
  { id: "6", name: "Real Estate", slug: "real-estate", status: "Active", projects: 5 },
  { id: "7", name: "Education", slug: "education", status: "Active", projects: 7 },
];

const columns = [
  { key: "name" as const, label: "Industry", sortable: true },
  { key: "slug" as const, label: "Slug" },
  { key: "projects" as const, label: "Projects", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{row.status as string}</span>
    ),
  },
];

export default function IndustriesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Industries" buttonLabel="Add Industry" buttonHref="/industries/add" />
      <DataTable data={industries} columns={columns} onEdit={(item) => alert(`Edit ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
