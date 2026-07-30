"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const quotes = [
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
    render: (row) => {
      const colors: Record<string, string> = { Pending: "bg-yellow-100 text-yellow-700", Quoted: "bg-blue-100 text-blue-700", Won: "bg-green-100 text-green-700" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as string] ?? "bg-gray-100 text-gray-600"}`}>{row.status as string}</span>;
    },
  },
];

export default function QuoteRequestsPage() {
  return (
    <AdminLayout>
      <PageHeader title="Quote Requests" />
      <DataTable data={quotes} columns={columns} onEdit={(item) => alert(`View ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
