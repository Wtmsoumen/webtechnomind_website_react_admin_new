"use client";

import AdminLayout from "@/components/AdminLayout";
import ServiceForm from "@/components/ServiceForm";
import { use } from "react";

export default function EditAIServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit AI Service</h1>
        <div className="text-sm text-gray-500">
          <span className="text-primary-500">AI Solutions</span> / <span>Edit Service</span>
        </div>
      </div>
      <ServiceForm isEdit initialData={{ parentService: "AI Solutions", subService: "", title: `AI Service ${id}`, displayIn: "Header", slug: `ai-service-${id}`, metaDescription: "", metaTitle: "", metaKeyword: "", schemaSection: "", heroTitle: "", heroSubtitle: "", heroDescription: "", bannerTitle: "", bannerDescription: "", status: "Active", quotationTitle: "", quotationDescription: "", technology: "" }} />
    </AdminLayout>
  );
}
