"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const team = [
  { id: "1", name: "John Doe", role: "CEO & Founder", department: "Leadership", status: "Active" },
  { id: "2", name: "Jane Smith", role: "CTO", department: "Technology", status: "Active" },
  { id: "3", name: "Mike Johnson", role: "Lead Developer", department: "Engineering", status: "Active" },
  { id: "4", name: "Sara Wilson", role: "Marketing Head", department: "Marketing", status: "Active" },
];

const columns = [
  { key: "name" as const, label: "Name", sortable: true },
  { key: "role" as const, label: "Role" },
  { key: "department" as const, label: "Department", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{row.status as string}</span>
    ),
  },
];

export default function TeamPage() {
  return (
    <AdminLayout>
      <PageHeader title="Team Members" buttonLabel="Add Member" buttonHref="/company/team/add" />
      <DataTable data={team} columns={columns} onEdit={(item) => alert(`Edit ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
