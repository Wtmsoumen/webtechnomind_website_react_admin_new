"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";
import { sampleReviews } from "@/lib/sampleData";

type Review = Record<string, unknown>;

const columns = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  {
    key: "rating",
    label: "Rating",
    render: (row: Review) => (
      <span className="text-yellow-500">{"★".repeat(Number(row.rating))}{"☆".repeat(5 - Number(row.rating))}</span>
    ),
  },
  { key: "review", label: "Review" },
  {
    key: "status",
    label: "Status",
    render: (row: Review) => (
      <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
        {String(row.status)}
      </span>
    ),
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>(sampleReviews as unknown as Review[]);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="All Reviews" buttonLabel="Add Review" buttonHref="/reviews/add" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable
          columns={columns}
          data={reviews}
          onEdit={(item) => router.push(`/reviews/edit/${item.id}`)}
          onDelete={(item) => setDeleteTarget(item)}
        />
      </div>
      {deleteTarget && (
        <DeleteModal
          entityLabel="Review"
          itemName={String(deleteTarget.name ?? "this review")}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
