"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const dmServices = [
  { id: "1", name: "Digital Marketing", slug: "digital-marketing", status: "Active", order: 1 },
  { id: "2", name: "SEO Services", slug: "seo", status: "Active", order: 2 },
  { id: "3", name: "Social Media Marketing", slug: "social-media", status: "Active", order: 3 },
  { id: "4", name: "Lead Generation", slug: "lead-generation", status: "Active", order: 4 },
  { id: "5", name: "Content Marketing", slug: "content", status: "Active", order: 5 },
  { id: "6", name: "Google Ad Campaigns", slug: "google-ads", status: "Active", order: 6 },
  { id: "7", name: "Paid Advertising", slug: "paid-ads", status: "Active", order: 7 },
];

const columns = [
  { key: "name" as const, label: "Service Name", sortable: true },
  { key: "slug" as const, label: "Slug" },
  {
    key: "status" as const,
    label: "Status",
    render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
        {row.status as string}
      </span>
    ),
  },
  { key: "order" as const, label: "Order", sortable: true },
];

export default function DigitalMarketingPage() {
  return (
    <AdminLayout>
      <PageHeader title="Digital Marketing Services" buttonLabel="Add Service" buttonHref="/digital-marketing/add" />
      <DataTable data={dmServices} columns={columns} onEdit={(item) => alert(`Edit ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
