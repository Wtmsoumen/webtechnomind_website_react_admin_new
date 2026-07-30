"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const jobs = [
  { id: "1", title: "Senior React Developer", department: "Engineering", type: "Full-time", applications: 24, status: "Open" },
  { id: "2", title: "AI/ML Engineer", department: "AI Solutions", type: "Full-time", applications: 18, status: "Open" },
  { id: "3", title: "Digital Marketing Manager", department: "Marketing", type: "Full-time", applications: 12, status: "Open" },
  { id: "4", title: "Flutter Developer", department: "Mobile", type: "Full-time", applications: 9, status: "Closed" },
];

const columns = [
  { key: "title" as const, label: "Job Title", sortable: true },
  { key: "department" as const, label: "Department", sortable: true },
  { key: "type" as const, label: "Type" },
  { key: "applications" as const, label: "Applications", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {row.status as string}
      </span>
    ),
  },
];

export default function CareersPage() {
  return (
    <AdminLayout>
      <PageHeader title="Career Openings" buttonLabel="Add Job Post" buttonHref="/company/careers/add" />
      <DataTable data={jobs} columns={columns} onEdit={(item) => alert(`Edit ${item.title}`)} onDelete={(item) => alert(`Delete ${item.title}`)} />
    </AdminLayout>
  );
}
