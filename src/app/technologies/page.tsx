"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialTechnologies = [
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
  const router = useRouter();
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialTechnologies)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setTechnologies((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Technologies" buttonLabel="Add Technology" buttonHref="/technologies/add" />
      <DataTable
        data={technologies}
        columns={columns}
        onEdit={(item) => router.push(`/technologies/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialTechnologies[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Technology"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
