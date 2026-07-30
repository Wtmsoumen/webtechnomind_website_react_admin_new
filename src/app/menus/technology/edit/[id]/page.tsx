"use client";

import AdminLayout from "@/components/AdminLayout";
import MenuForm from "@/components/MenuForm";
import { sampleTechMenus } from "@/lib/sampleData";
import { use } from "react";

export default function EditTechnologyMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = sampleTechMenus.find((s) => s.id === id);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Technology Menu</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Home</span> / <span>Edit Technology Menu</span>
        </div>
      </div>
      <MenuForm menuType="technology" isEdit initialData={{ name: item?.name ?? "", parent: item?.parent ?? "" }} />
    </AdminLayout>
  );
}
