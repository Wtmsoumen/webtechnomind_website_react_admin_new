"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialInquiries = [
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
    render: (row: Record<string, unknown>) => {
      const colors: Record<string, string> = { New: "bg-blue-100 text-blue-700", Contacted: "bg-yellow-100 text-yellow-700", Converted: "bg-green-100 text-green-700" };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as string] ?? "bg-gray-100 text-gray-600"}`}>{row.status as string}</span>;
    },
  },
];

export default function ContactInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialInquiries)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setInquiries((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Contact Inquiries" />
      <DataTable
        data={inquiries}
        columns={columns}
        onEdit={(item) => router.push(`/leads/contacts/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialInquiries[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Inquiry"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
