"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const inquiries = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@example.com", service: "AI Development", date: "2026-07-28", status: "New" },
  { id: "2", name: "Sarah Connor", email: "sarah@example.com", service: "Web App Dev", date: "2026-07-27", status: "Contacted" },
  { id: "3", name: "Amit Patel", email: "amit@example.com", service: "SEO Services", date: "2026-07-25", status: "New" },
  { id: "4", name: "Lisa Wang", email: "lisa@example.com", service: "Mobile App Dev", date: "2026-07-24", status: "Converted" },
];

const columns = [
  { key: "name" as const, label: "Name", sortable: true },
  { key: "email" as const, label: "Email" },
  { key: "service" as const, label: "Service Interest", sortable: true },
  { key: "date" as const, label: "Date", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (row) => {
      const colors: Record<string, string> = { New: "bg-blue-100 text-blue-700", Contacted: "bg-yellow-100 text-yellow-700", Converted: "bg-green-100 text-green-700" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as string] ?? "bg-gray-100 text-gray-600"}`}>{row.status as string}</span>;
    },
  },
];

export default function ContactInquiriesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Contact Inquiries" />
      <DataTable data={inquiries} columns={columns} onEdit={(item) => alert(`View ${item.name}`)} onDelete={(item) => alert(`Delete ${item.name}`)} />
    </AdminLayout>
  );
}
