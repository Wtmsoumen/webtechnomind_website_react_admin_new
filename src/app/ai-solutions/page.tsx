"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialServices = [
  { id: "1", name: "AI Development", slug: "ai-development", status: "Active", order: 1 },
  { id: "2", name: "AI Chatbot Development", slug: "ai-chatbot", status: "Active", order: 2 },
  { id: "3", name: "Generative AI Development", slug: "generative-ai", status: "Active", order: 3 },
  { id: "4", name: "AI Agent Development", slug: "ai-agent", status: "Active", order: 4 },
  { id: "5", name: "AI Integration", slug: "ai-integration", status: "Active", order: 5 },
  { id: "6", name: "ML Development", slug: "ml-development", status: "Active", order: 6 },
  { id: "7", name: "AI Product Development", slug: "ai-product", status: "Active", order: 7 },
];

const columns = [
  { key: "name" as const, label: "Service Name", sortable: true },
  { key: "slug" as const, label: "Slug" },
  {
    key: "status" as const,
    label: "Status",
    render: (row: Record<string, unknown>) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
        {row.status as string}
      </span>
    ),
  },
  { key: "order" as const, label: "Order", sortable: true },
];

export default function AIServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialServices)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="AI Solutions" buttonLabel="Add Service" buttonHref="/ai-solutions/add" />
      <DataTable
        data={services}
        columns={columns}
        onEdit={(item) => router.push(`/ai-solutions/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialServices[0])}
        onReorder={(reordered) => setServices(reordered as typeof initialServices)}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="AI Service"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
