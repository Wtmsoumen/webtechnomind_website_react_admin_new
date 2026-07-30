"use client";

import AdminLayout from "@/components/AdminLayout";
import ServiceForm from "@/components/ServiceForm";

export default function AddServicePage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Service</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 hover:underline cursor-pointer">Home</span>
          <span className="mx-1">/</span>
          <span>Add Service</span>
        </div>
      </div>
      <ServiceForm />
    </AdminLayout>
  );
}
