"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/DeleteModal";
import { useRouter } from "next/navigation";
import { sampleMenus } from "@/lib/sampleData";
const columns = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "type", label: "Type" },
  { key: "parentMenu", label: "Parent Menu" },
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

export default function MenusPage() {
  const router = useRouter();
  const [menus, setMenus] = useState<Record<string, unknown>[]>(
    sampleMenus as unknown as Record<string, unknown>[]
  );
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setMenus((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <PageHeader title="Menu List" buttonLabel="Add Menu" buttonHref="/menus/add" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable
          columns={columns}
          data={menus}
          onEdit={(row) => router.push(`/menus/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)}
          onReorder={(reordered) => setMenus(reordered)}
        />
      </div>

      {deleteTarget && (
        <DeleteModal
          itemName={String(deleteTarget.name || "")}
          entityLabel="Menu"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
