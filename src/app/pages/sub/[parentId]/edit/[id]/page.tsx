"use client";

import { use, useState, useEffect } from "react";
import SubPageForm from "@/components/SubPageForm";
import AdminLayout from "@/components/AdminLayout";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export default function EditSubPage({ params }: { params: Promise<{ parentId: string; id: string }> }) {
  const { parentId, id } = use(params);
  const pid = Number(parentId);
  const [parentData, setParentData] = useState<{ name: string; posttype: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(endpoints.admin_page_edit, { params: { id: parentId } });
        const p = data.response_data?.page;
        setParentData({ name: p?.page_name || "Page", posttype: p?.posttype || "page" });
      } catch { setParentData({ name: "Page", posttype: "page" }); }
      finally { setLoading(false); }
    })();
  }, [parentId]);

  if (loading || !parentData) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <SubPageForm
      pageId={id}
      parentId={pid}
      posttype={parentData.posttype}
      backPath={`/pages/sub/${parentId}`}
      title={`Edit ${parentData.name}`}
      entityLabel={parentData.name}
    />
  );
}
