"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";

const initialPosts = [
  { id: "1", title: "How to Improve Brand Visibility in AI Search Engines", category: "AI", author: "Admin", date: "2026-07-15", status: "Published" },
  { id: "2", title: "5 Practical AI Solutions That Deliver Real ROI for SMEs", category: "AI", author: "Admin", date: "2026-07-10", status: "Published" },
  { id: "3", title: "The Real Impact of AI on SEO Today", category: "SEO", author: "Admin", date: "2026-07-05", status: "Published" },
  { id: "4", title: "E-commerce Website Development Cost in Kolkata", category: "Web Dev", author: "Admin", date: "2026-06-28", status: "Draft" },
];

const columns = [
  { key: "title" as const, label: "Title", sortable: true },
  { key: "category" as const, label: "Category", sortable: true },
  { key: "date" as const, label: "Date", sortable: true },
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

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deleteTarget, setDeleteTarget] = useState<(typeof initialPosts)[0] | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Blog Posts" buttonLabel="Add Post" buttonHref="/blog/add" />
      <DataTable
        data={posts}
        columns={columns}
        onEdit={(item) => router.push(`/blog/edit/${item.id}`)}
        onDelete={(item) => setDeleteTarget(item as typeof initialPosts[0])}
      />
      {deleteTarget && (
        <DeleteModal
          entityLabel="Blog Post"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
