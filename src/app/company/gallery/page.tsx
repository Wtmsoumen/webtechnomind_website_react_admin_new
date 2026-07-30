"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";

const galleryItems = [
  { id: "1", title: "Team Outing 2024", category: "Events", image: "/placeholder.jpg" },
  { id: "2", title: "Office Space", category: "Office", image: "/placeholder.jpg" },
  { id: "3", title: "Client Meeting", category: "Work", image: "/placeholder.jpg" },
  { id: "4", title: "Award Ceremony", category: "Awards", image: "/placeholder.jpg" },
  { id: "5", title: "Hackathon", category: "Events", image: "/placeholder.jpg" },
  { id: "6", title: "Diwali Celebration", category: "Events", image: "/placeholder.jpg" },
];

export default function GalleryPage() {
  return (
    <AdminLayout>
      <PageHeader title="Gallery" buttonLabel="Add Photo" buttonHref="/company/gallery/add" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
            <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              Photo
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
