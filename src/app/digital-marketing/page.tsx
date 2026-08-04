"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialServices = [
  { id: "1", name: "Digital Marketing", slug: "digital-marketing", status: "Active", order: 1 },
  { id: "2", name: "SEO Services", slug: "seo", status: "Active", order: 2 },
  { id: "3", name: "Social Media Marketing", slug: "social-media", status: "Active", order: 3 },
  { id: "4", name: "Lead Generation", slug: "lead-generation", status: "Active", order: 4 },
  { id: "5", name: "Content Marketing", slug: "content", status: "Active", order: 5 },
  { id: "6", name: "Google Ad Campaigns", slug: "google-ads", status: "Active", order: 6 },
  { id: "7", name: "Paid Advertising", slug: "paid-ads", status: "Active", order: 7 },
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

export default function DigitalMarketingPage() {
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
      <PageHeader title="Digital Marketing Services" buttonLabel="Add Service" buttonHref="/digital-marketing/add" />
      <DataTable
        data={services}
        columns={columns}
        onEdit={(item) => router.push(`/digital-marketing/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialServices[0])}
        onReorder={(reordered) => setServices(reordered as typeof initialServices)}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Service"
          itemName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
