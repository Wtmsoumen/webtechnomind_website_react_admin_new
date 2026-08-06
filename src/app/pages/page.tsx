"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineSwitchVertical, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineFolder, HiOutlineDocumentText } from "react-icons/hi";

interface Page {
  id: number;
  page_name: string;
  page_title: string;
  slug: string;
  status: number;
  menu_order: number;
  display_in: number;
  posttype: string;
  image?: string;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_Image_URL || "";

interface PaginationData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Page[];
}

export default function PagesListPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginationData, "data">>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("menu_order");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Page | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { orderby: orderBy, order, page: currentPage };
      if (search) params.search = search;
      const { data } = await apiClient.get(endpoints.admin_pages, { params });
      const rd = data.response_data;
      setPages(rd.data || []);
      setPagination({ current_page: rd.current_page, last_page: rd.last_page, per_page: rd.per_page, total: rd.total });
    } catch {
      toast.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  }, [orderBy, order, search, currentPage]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, orderBy, order]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiClient.delete(endpoints.admin_page_delete, { params: { id: deleteTarget.id } });
      toast.success("Page deleted");
      setDeleteTarget(null);
      fetchPages();
    } catch {
      toast.error("Failed to delete page");
    }
  };

  const handleSort = (key: string) => {
    if (orderBy === key) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  const canDrag = !search && orderBy === "menu_order";

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };

  const handleDrop = async (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...pages];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    const updated = reordered.map((p, i) => ({ ...p, menu_order: i + 1 }));
    setPages(updated);
    setDragIndex(null);
    setDragOverIndex(null);

    try {
      for (const p of updated) {
        await apiClient.post(endpoints.admin_page_update, {
          id: p.id,
          page_name: p.page_name,
          page_title: p.page_title,
          slug: p.slug,
          display_in: p.display_in,
          status: p.status,
          menu_order: p.menu_order,
          posttype: p.posttype || "page",
        });
      }
      toast.success("Order updated");
    } catch {
      toast.error("Failed to update order");
      fetchPages();
    }
  };

  const sortIcon = (key: string) => {
    if (orderBy !== key) return "";
    return order === "asc" ? " ↑" : " ↓";
  };

  return (
    <AdminLayout>
      <PageHeader title="Pages" buttonLabel="Add Page" buttonHref="/pages/add" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{pagination.total} total records</span>
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
                  <th className="text-left py-3 px-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort("id")}>#{sortIcon("id")}</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort("page_name")}>Page Name{sortIcon("page_name")}</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Slug</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort("status")}>Status{sortIcon("status")}</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort("menu_order")}>Order{sortIcon("menu_order")}</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, index) => (
                  <tr
                    key={page.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${dragOverIndex === index ? "bg-primary-50" : ""}`}
                    draggable={canDrag}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
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
                    <td className="py-3 px-3 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        {page.image ? (
                          <img src={`${IMAGE_BASE_URL}${page.image}`} alt={page.page_name} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <HiOutlineFolder className="w-4 h-4" />
                          </div>
                        )}
                        {page.page_name}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{page.slug}</td>
                    <td className="py-3 px-3">
                      <span className={page.status === 1 ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
                        {page.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">{page.menu_order}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => router.push(`/pages/edit/${page.id}`)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors">Edit</button>
                        <button onClick={() => setDeleteTarget(page)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr><td colSpan={canDrag ? 7 : 6} className="text-center py-12 text-gray-400">No pages found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {pagination.last_page > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <HiOutlineChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${pg === currentPage ? "bg-primary-500 text-white" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.last_page, p + 1))}
                disabled={currentPage === pagination.last_page}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <HiOutlineChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          itemName={deleteTarget.page_name}
          entityLabel="Page"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
