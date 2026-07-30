"use client";

import AdminLayout from "@/components/AdminLayout";
import MenuForm from "@/components/MenuForm";
import { sampleServiceMenus } from "@/lib/sampleData";
import { use } from "react";

export default function EditServiceMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = sampleServiceMenus.find((s) => s.id === id);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Service Menu</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Home</span> / <span>Edit Service Menu</span>
        </div>
      </div>
      <MenuForm menuType="services" isEdit initialData={{ name: item?.name ?? "", parent: item?.parent ?? "" }} />
    </AdminLayout>
  );
}
