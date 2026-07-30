"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const technologies = [
  { id: "1", name: "React", category: "Frontend", icon: "react.svg", status: "Active" },
  { id: "2", name: "Next.js", category: "Frontend", icon: "nextjs.svg", status: "Active" },
  { id: "3", name: "Node.js", category: "Backend", icon: "nodejs.svg", status: "Active" },
  { id: "4", name: "Python", category: "AI/ML", icon: "python.svg", status: "Active" },
  { id: "5", name: "Flutter", category: "Mobile", icon: "flutter.svg", status: "Active" },
  { id: "6", name: "AWS", category: "Cloud", icon: "aws.svg", status: "Active" },
  { id: "7", name: "TensorFlow", category: "AI/ML", icon: "tensorflow.svg", status: "Active" },
];

const columns = [
  { key: "name" as const, label: "Technology", sortable: true },
  { key: "category" as const, label: "Category", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{row.status as string}</span>
    ),
  },
];

export default function TechnologiesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Technologies" buttonLabel="Add Technology" buttonHref="/technologies/add" />
      <DataTable data={technologies} columns={columns} onEdit={(item) => alert(`Edit ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
