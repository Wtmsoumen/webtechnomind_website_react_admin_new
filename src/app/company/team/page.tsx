"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialTeam = [
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
  const router = useRouter();
  const [team, setTeam] = useState(initialTeam);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialTeam)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setTeam((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Team Members" buttonLabel="Add Member" buttonHref="/company/team/add" />
      <DataTable
        data={team}
        columns={columns}
        onEdit={(item) => router.push(`/company/team/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialTeam[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Team Member"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
