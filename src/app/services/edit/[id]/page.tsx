"use client";

import AdminLayout from "@/components/AdminLayout";
import ServiceForm from "@/components/ServiceForm";
import { sampleServices } from "@/lib/sampleData";
import { use } from "react";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = sampleServices.find((s) => s.id === id);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 hover:underline cursor-pointer">Home</span>
          <span className="mx-1">/</span>
          <span>Edit Service</span>
        </div>
      </div>
      <ServiceForm
        isEdit
        initialData={{
          parentService: service?.parentService || "Main Service",
          subService: "",
          title: service?.title || "",
          displayIn: "Header",
          slug: service?.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "",
          metaDescription: service?.description || "",
          metaTitle: service?.title || "",
          metaKeyword: "",
          schemaSection: "",
          heroTitle: service?.title || "",
          heroSubtitle: "",
          heroDescription: service?.description || "",
          bannerTitle: "",
          bannerDescription: "",
          status: service?.status || "Active",
          quotationTitle: "",
          quotationDescription: "",
          technology: "",
        }}
      />
    </AdminLayout>
  );
}
