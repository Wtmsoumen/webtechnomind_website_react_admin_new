"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialCaseStudies = [
  { id: "1", title: "AI Chatbot for FinTech Startup", industry: "FinTech", service: "AI Chatbot", status: "Published" },
  { id: "2", title: "E-commerce Platform Migration", industry: "eCommerce", service: "Web App Dev", status: "Published" },
  { id: "3", title: "Healthcare App Development", industry: "Healthcare", service: "Mobile App Dev", status: "Draft" },
];

const columns = [
  { key: "title" as const, label: "Title", sortable: true },
  { key: "industry" as const, label: "Industry", sortable: true },
  { key: "service" as const, label: "Service" },
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

export default function CaseStudiesPage() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialCaseStudies)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setCaseStudies((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Case Studies" buttonLabel="Add Case Study" buttonHref="/Contact/case-studies/add" />
      <DataTable
        data={caseStudies}
        columns={columns}
        onEdit={(item) => router.push(`/Contact/case-studies/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialCaseStudies[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Case Study"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
