"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialQuotes = [
  { id: "1", name: "Tech Startup Inc", service: "AI Chatbot Development", budget: "$10k-25k", date: "2026-07-28", status: "Pending" },
  { id: "2", name: "E-Shop Global", service: "E-commerce Development", budget: "$25k-50k", date: "2026-07-26", status: "Quoted" },
  { id: "3", name: "Health Corp", service: "Mobile App Dev", budget: "$50k+", date: "2026-07-22", status: "Won" },
];

const columns = [
  { key: "name" as const, label: "Company", sortable: true },
  { key: "service" as const, label: "Service", sortable: true },
  { key: "budget" as const, label: "Budget" },
  { key: "date" as const, label: "Date", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => {
      const colors: Record<string, string> = { Pending: "bg-yellow-100 text-yellow-700", Quoted: "bg-blue-100 text-blue-700", Won: "bg-green-100 text-green-700" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as string] ?? "bg-gray-100 text-gray-600"}`}>{row.status as string}</span>;
    },
  },
];

export default function QuoteRequestsPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialQuotes)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setQuotes((prev) => prev.filter((q) => q.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Quote Requests" />
      <DataTable
        data={quotes}
        columns={columns}
        onEdit={(item) => router.push(`/leads/quotes/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialQuotes[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Quote Request"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
