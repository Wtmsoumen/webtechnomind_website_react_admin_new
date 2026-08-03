"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  status: string;
}

const initialGallery: GalleryItem[] = [
  { id: "1", title: "Team Outing 2024", category: "Events", image: "/placeholder.jpg", status: "Published" },
  { id: "2", title: "Office Space", category: "Office", image: "/placeholder.jpg", status: "Published" },
  { id: "3", title: "Client Meeting", category: "Work", image: "/placeholder.jpg", status: "Published" },
  { id: "4", title: "Award Ceremony", category: "Awards", image: "/placeholder.jpg", status: "Published" },
  { id: "5", title: "Hackathon", category: "Events", image: "/placeholder.jpg", status: "Draft" },
  { id: "6", title: "Diwali Celebration", category: "Events", image: "/placeholder.jpg", status: "Published" },
];

export default function GalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Gallery" buttonLabel="Add Photo" buttonHref="/company/gallery/add" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm relative">
              Photo
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => router.push(`/company/gallery/edit/${item.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-accent-600 bg-accent-50 border border-accent-200 rounded-lg hover:bg-accent-100 transition-colors"
                >
                  <HiOutlinePencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <HiOutlineTrash className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm font-medium">No gallery photos yet.</p>
          <p className="text-xs mt-1">Click &quot;Add Photo&quot; to get started.</p>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          entityLabel="Photo"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
