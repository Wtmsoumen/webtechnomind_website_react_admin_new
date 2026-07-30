"use client";

import AdminLayout from "@/components/AdminLayout";
import MenuForm from "@/components/MenuForm";

export default function AddCompanyMenuPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Company Menu</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">Home</span> / <span>Add Company Menu</span>
        </div>
      </div>
      <MenuForm menuType="company" />
    </AdminLayout>
  );
}
