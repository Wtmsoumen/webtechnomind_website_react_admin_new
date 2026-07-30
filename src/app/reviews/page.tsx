"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { sampleReviews } from "@/lib/sampleData";

const columns = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  {
    key: "rating",
    label: "Rating",
    render: (row: Record<string, unknown>) => (
      <span className="text-yellow-500">{"★".repeat(Number(row.rating))}{"☆".repeat(5 - Number(row.rating))}</span>
    ),
  },
  { key: "review", label: "Review" },
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

export default function ReviewsPage() {
  return (
    <AdminLayout>
      <PageHeader title="All Reviews" buttonLabel="Add Review" buttonHref="/reviews/add" />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DataTable columns={columns} data={sampleReviews as unknown as Record<string, unknown>[]} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </AdminLayout>
  );
}
