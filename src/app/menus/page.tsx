"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { sampleMenus } from "@/lib/sampleData";
const columns = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "type", label: "Type" },
  { key: "parentMenu", label: "Parent Menu" },
  { key: "order", label: "Order" },
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

export default function MenusPage() {
  return (
    <AdminLayout>
      <PageHeader title="Menu List" buttonLabel="Add Menu" buttonHref="/menus/add" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable
          columns={columns}
          data={sampleMenus as unknown as Record<string, unknown>[]}
          onEdit={(row) => alert(`Edit: ${row.name}`)}
          onDelete={(row) => alert(`Delete: ${row.name}`)}
        />
      </div>
    </AdminLayout>
  );
}
