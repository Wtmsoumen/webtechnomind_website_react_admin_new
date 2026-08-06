"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialContacts = [
  { id: "1", name: "Timble — Dating Platform", category: "Mobile App", client: "Timble Inc.", status: "Published" },
  { id: "2", name: "Easy Drinks — E-Commerce", category: "E-commerce", client: "Grutas", status: "Published" },
  { id: "3", name: "Paper Track — Mobile App", category: "Mobile App", client: "Paper Track", status: "Published" },
  { id: "4", name: "WhiteBook — Photography", category: "Web App", client: "WhiteBook", status: "Published" },
  { id: "5", name: "Enigma Psychometry", category: "Education", client: "Enigma", status: "Published" },
  { id: "6", name: "Re-Energi — Renewable Energy", category: "Web App", client: "Re-Energi", status: "Published" },
  { id: "7", name: "Sky-Maldives — Adventure", category: "WordPress", client: "Sky Maldives", status: "Draft" },
];

const columns = [
  { key: "name" as const, label: "Project", sortable: true },
  { key: "category" as const, label: "Category", sortable: true },
  { key: "client" as const, label: "Client" },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {row.status as string}
      </span>
    ),
  },
];

export default function ContactPage() {
  const router = useRouter();
  const [Contacts, setContacts] = useState(initialContacts);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialContacts)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setContacts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Contact" buttonLabel="Add Project" buttonHref="/Contact/add" />
      <DataTable
        data={Contacts}
        columns={columns}
        onEdit={(item) => router.push(`/Contact/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialContacts[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Project"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
