"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const webServices = [
  { id: "1", name: "Web App Development", slug: "web-app", status: "Active", order: 1 },
  { id: "2", name: "Mobile App Development", slug: "mobile-app", status: "Active", order: 2 },
  { id: "3", name: "iOS App Development", slug: "ios-app", status: "Active", order: 3 },
  { id: "4", name: "Android App Development", slug: "android-app", status: "Active", order: 4 },
  { id: "5", name: "Software Development", slug: "software", status: "Active", order: 5 },
  { id: "6", name: "Blockchain Development", slug: "blockchain", status: "Active", order: 6 },
  { id: "7", name: "E-commerce Development", slug: "ecommerce", status: "Active", order: 7 },
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

export default function WebSoftwarePage() {
  return (
    <AdminLayout>
      <PageHeader title="Web & Software Development" buttonLabel="Add Service" buttonHref="/web-software/add" />
      <DataTable data={webServices} columns={columns} onEdit={(item) => alert(`Edit ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
