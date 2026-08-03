"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import DeleteModal from "@/components/DeleteModal";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category?: string;
}

const initialMilestones: Milestone[] = [
  { id: "1", year: "2018", title: "Company Founded", description: "Webtechnomind IT Solutions started with a vision to deliver innovative IT solutions.", category: "Founding" },
  { id: "2", year: "2019", title: "First Major Client", description: "Secured first enterprise client and expanded the team to 15 members.", category: "Growth" },
  { id: "3", year: "2020", title: "Digital Marketing Division", description: "Launched dedicated digital marketing services division.", category: "Product Launch" },
  { id: "4", year: "2021", title: "AI Solutions Launch", description: "Expanded into AI/ML development and launched AI solutions vertical.", category: "Product Launch" },
  { id: "5", year: "2023", title: "50+ Projects Delivered", description: "Crossed 50 successful project deliveries across multiple industries.", category: "Growth" },
  { id: "6", year: "2024", title: "Global Expansion", description: "Started serving clients globally with remote development teams.", category: "Expansion" },
];

export default function JourneyPage() {
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [deleteTarget, setDeleteTarget] = useState<Milestone | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      setMilestones((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="Company Journey" buttonLabel="Add Milestone" buttonHref="/company/journey/add" />

      <div className="space-y-4">
        {milestones.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-bold text-lg shrink-0">
              {m.year}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900">{m.title}</h3>
                {m.category && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100 font-medium">
                    {m.category}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{m.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => router.push(`/company/journey/edit/${m.id}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-accent-600 bg-accent-50 border border-accent-200 rounded-lg hover:bg-accent-100 transition-colors"
              >
                <HiOutlinePencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(m)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {milestones.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm font-medium">No milestones yet.</p>
          <p className="text-xs mt-1">Click &quot;Add Milestone&quot; to get started.</p>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          entityLabel="Milestone"
          itemName={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
