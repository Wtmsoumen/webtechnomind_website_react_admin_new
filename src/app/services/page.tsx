"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/DeleteModal";
import { sampleServices } from "@/lib/sampleData";
import Link from "next/link";
import { useRouter } from "next/navigation";

const columns = [
  { key: "parentService", label: "Parent Service" },
  { key: "title", label: "Title" },
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
  { key: "order", label: "Order" },
];

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState(sampleServices);
  const [deleteTarget, setDeleteTarget] = useState<(typeof sampleServices)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sub Service List</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 hover:underline cursor-pointer">Home</span>
          <span className="mx-1">/</span>
          <span>Sub Services</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Sub Service List</span>
          <div className="flex gap-3">
            <Link
              href="/services/add"
              className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              + Add Service
            </Link>
            <button className="flex items-center gap-1 bg-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-all">
              + Manage Order
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={services as unknown as Record<string, unknown>[]}
          onEdit={(row) => router.push(`/services/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row as unknown as (typeof sampleServices)[0])}
        />
      </div>

      {deleteTarget && (
        <DeleteModal
          entityLabel="Service"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
