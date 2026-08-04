"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/DeleteModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuListPageProps {
  title: string;
  breadcrumb: string;
  addLabel: string;
  addHref: string;
  editBasePath: string;
  columns: { key: string; label: string; render?: (row: Record<string, unknown>) => React.ReactNode }[];
  data: Record<string, unknown>[];
  showManageOrder?: boolean;
  entityLabel?: string;
}

export default function MenuListPage({
  title,
  breadcrumb,
  addLabel,
  addHref,
  editBasePath,
  columns,
  data,
  showManageOrder = true,
  entityLabel = "Menu Item",
}: MenuListPageProps) {
  const router = useRouter();
  const [items, setItems] = useState<Record<string, unknown>[]>(data);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 hover:underline cursor-pointer">Home</span>
          <span className="mx-1">/</span>
          <span>{breadcrumb}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">{title}</span>
          <div className="flex gap-3">
            <Link
              href={addHref}
              className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              + {addLabel}
            </Link>
            {showManageOrder && (
              <button className="flex items-center gap-1 bg-accent-500 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition-all">
                + Manage Order
              </button>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={items}
          onEdit={(row) => router.push(`${editBasePath}/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)}
          onReorder={(reordered) => setItems(reordered)}
        />
      </div>

      {deleteTarget && (
        <DeleteModal
          itemName={String(deleteTarget.name || deleteTarget.title || "")}
          entityLabel={entityLabel}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
