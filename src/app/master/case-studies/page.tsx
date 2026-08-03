"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/DeleteModal";
import { sampleCaseStudies } from "@/lib/sampleData";

const columns = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "client", label: "Client" },
  { key: "industry", label: "Industry" },
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

export default function CaseStudiesPage() {
  const [items, setItems] = useState(sampleCaseStudies as unknown as Record<string, unknown>[]);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Case Study List" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable
          columns={columns}
          data={items}
          onEdit={() => {}}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>
      {deleteTarget && (
        <DeleteModal
          entityLabel="Case Study"
          itemName={String(deleteTarget.title ?? deleteTarget.name ?? "")}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
