"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineSwitchVertical, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { usePostTypeFilter } from "@/context/PostTypeFilterContext";

interface SubPage {
  id: number;
  page_name: string;
  page_title: string;
  slug: string;
  status: number;
  menu_order: number;
  display_in: number;
  posttype: string;
  parent_id: number;
}

interface SubPageListProps {
  title: string;
  parentId: number;
  basePath: string;
  entityLabel: string;
  addLabel?: string;
}

export default function SubPageList({ title, parentId, basePath, entityLabel, addLabel = "Add Page" }: SubPageListProps) {
  const router = useRouter();
  const [pages, setPages] = useState<SubPage[]>([]);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<SubPage | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const { postTypeFilter, postTypeOptions } = usePostTypeFilter();

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { orderby: "menu_order", order: "asc", per_page: 100, parent_id: parentId };
      if (search) params.search = search;
      const { data } = await apiClient.get(endpoints.admin_pages, { params });
      const rd = data.response_data;
      const allPages = rd.data || [];
      let filtered = allPages.filter((p: SubPage) => Number(p.parent_id) === parentId);
      if (postTypeFilter) filtered = filtered.filter((p: SubPage) => p.posttype === postTypeFilter);
      setPages(filtered);
      setTotal(filtered.length);
      setLastPage(1);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [parentId, search, currentPage, postTypeFilter]);

  useEffect(() => { fetchPages(); }, [fetchPages]);
  useEffect(() => { setCurrentPage(1); }, [search, postTypeFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiClient.delete(endpoints.admin_page_delete, { params: { id: deleteTarget.id } });
      toast.success(`${entityLabel} deleted`);
      setDeleteTarget(null);
      fetchPages();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleDrop = async (toIndex: number) => {
    if (dragIndex === null || dragIndex === toIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...pages];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(toIndex, 0, moved);
    const updated = reordered.map((p, i) => ({ ...p, menu_order: i + 1 }));
    setPages(updated);
    setDragIndex(null);
    setDragOverIndex(null);

    try {
      for (const p of updated) {
        await apiClient.post(endpoints.admin_page_update, {
          id: p.id, page_name: p.page_name, page_title: p.page_title,
          slug: p.slug, display_in: p.display_in, status: p.status,
          menu_order: p.menu_order, posttype: p.posttype, parent_id: p.parent_id,
        });
      }
      toast.success("Order updated");
    } catch {
      toast.error("Failed to update order");
      fetchPages();
    }
  };

  const canDrag = !search;

  return (
    <AdminLayout>
      <PageHeader title={title} buttonLabel={addLabel} buttonHref={`${basePath}/add`} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{total} total records</span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg w-64 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {canDrag && <th className="py-3 px-2 w-10" />}
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Slug</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Order</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, index) => (
                  <tr
                    key={page.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${dragOverIndex === index ? "bg-primary-50" : ""}`}
                    draggable={canDrag}
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                    style={dragIndex === index ? { opacity: 0.5 } : undefined}
                  >
                    {canDrag && (
                      <td className="py-3 px-2 cursor-grab text-gray-400">
                        <HiOutlineSwitchVertical className="w-4 h-4" />
                      </td>
                    )}
                    <td className="py-3 px-3 text-gray-500">{page.id}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{page.page_name}</td>
                    <td className="py-3 px-3 text-gray-500">{page.slug}</td>
                    <td className="py-3 px-3">
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{postTypeOptions[page.posttype] || page.posttype}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={page.status === 1 ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
                        {page.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{page.menu_order}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => router.push(`${basePath}/edit/${page.id}`)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors">Edit</button>
                        <button onClick={() => setDeleteTarget(page)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr><td colSpan={canDrag ? 8 : 7} className="text-center py-12 text-gray-400">No records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {lastPage > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Page {currentPage} of {lastPage}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <HiOutlineChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: lastPage }, (_, i) => i + 1).map((pg) => (
                <button key={pg} onClick={() => setCurrentPage(pg)} className={`w-8 h-8 rounded-lg text-sm font-medium ${pg === currentPage ? "bg-primary-500 text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                  {pg}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))} disabled={currentPage === lastPage} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal itemName={deleteTarget.page_name} entityLabel={entityLabel} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </AdminLayout>
  );
}
