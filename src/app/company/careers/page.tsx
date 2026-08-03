"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialJobs = [
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
    render: (row: Record<string, unknown>) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {row.status as string}
      </span>
    ),
  },
];

export default function CareersPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialJobs)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Career Openings" buttonLabel="Add Job Post" buttonHref="/company/careers/add" />
      <DataTable
        data={jobs}
        columns={columns}
        onEdit={(item) => router.push(`/company/careers/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialJobs[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Job Post"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
