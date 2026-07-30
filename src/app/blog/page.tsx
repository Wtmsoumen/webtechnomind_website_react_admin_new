"use client";

import AdminLayout from "@/components/AdminLayout";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";

const posts = [
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
  return (
    <AdminLayout>
      <PageHeader title="Blog Posts" buttonLabel="Add Post" buttonHref="/blog/add" />
      <DataTable data={posts} columns={columns} onEdit={(item) => alert(`Edit ${item.title}`)} onDelete={(item) => alert(`Delete ${item.title}`)} />
    </AdminLayout>
  );
}
