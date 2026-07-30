"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { sampleTeam } from "@/lib/sampleData";

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
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

export default function TeamPage() {
  return (
    <AdminLayout>
      <PageHeader title="Team List" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable columns={columns} data={sampleTeam as unknown as Record<string, unknown>[]} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </AdminLayout>
  );
}
