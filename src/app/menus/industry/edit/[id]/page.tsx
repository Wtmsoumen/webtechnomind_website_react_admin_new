"use client";

import AdminLayout from "@/components/AdminLayout";
import MenuForm from "@/components/MenuForm";
import { sampleIndustries } from "@/lib/sampleData";
import { use } from "react";

export default function EditIndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = sampleIndustries.find((s) => s.id === id);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Industry Menu</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Home</span> / <span>Edit Industry Menu</span>
        </div>
      </div>
      <MenuForm menuType="industry" isEdit initialData={{ name: item?.name ?? "", parent: item?.parent ?? "" }} />
    </AdminLayout>
  );
}
