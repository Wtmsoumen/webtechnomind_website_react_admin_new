"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/DeleteModal";
import { sampleProducts } from "@/lib/sampleData";

const columns = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description" },
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

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [deleteTarget, setDeleteTarget] = useState<(typeof sampleProducts)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Product List" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable
          columns={columns}
          data={products as unknown as Record<string, unknown>[]}
          onEdit={() => {}}
          onDelete={(row) => setDeleteTarget(row as unknown as (typeof sampleProducts)[0])}
        />
      </div>

      {deleteTarget && (
        <DeleteModal
          entityLabel="Product"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
