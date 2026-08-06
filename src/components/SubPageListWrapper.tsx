"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import SubPageList from "@/components/SubPageList";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import type { SubPageConfig } from "@/lib/subpage-config";

export default function SubPageListWrapper({ config }: { config: SubPageConfig }) {
  const [parentId, setParentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_pages, { params: { search: config.parentName, orderby: "id", order: "asc" } });
        const pages = data.response_data?.data || [];
        const parent = pages.find((p: Record<string, unknown>) => p.page_name === config.parentName);
        if (parent) {
          setParentId(parent.id as number);
        } else if (pages.length > 0) {
          setParentId(pages[0].id as number);
        } else {
          toast.error(`Parent page "${config.parentName}" not found`);
        }
      } catch {
        toast.error("Failed to find parent page");
      } finally {
        setLoading(false);
      }
    })();
  }, [config.parentName]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (parentId === null) {
    return (
      <AdminLayout>
        <div className="text-center py-24 text-gray-400">Parent page &quot;{config.parentName}&quot; not found. Please create it in Pages first.</div>
      </AdminLayout>
    );
  }

  return <SubPageList title={config.title} parentId={parentId} basePath={config.basePath} entityLabel={config.entityLabel} addLabel={config.addLabel} />;
}
