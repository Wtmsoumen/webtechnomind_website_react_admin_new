"use client";

import { use, useState, useEffect } from "react";
import SubPageList from "@/components/SubPageList";
import AdminLayout from "@/components/AdminLayout";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export default function SubPagesListPage({ params }: { params: Promise<{ parentId: string }> }) {
  const { parentId } = use(params);
  const pid = Number(parentId);
  const [parentName, setParentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_page_edit, { params: { id: parentId } });
        setParentName(data.response_data?.page?.page_name || "Sub Pages");
      } catch { setParentName("Sub Pages"); }
      finally { setLoading(false); }
    })();
  }, [parentId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <SubPageList
      title={parentName}
      parentId={pid}
      basePath={`/pages/sub/${parentId}`}
      entityLabel={parentName}
      addLabel={`Add ${parentName}`}
    />
  );
}
