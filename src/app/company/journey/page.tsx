"use client";

import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";

const milestones = [
  { id: "1", year: "2018", title: "Company Founded", description: "Webtechnomind IT Solutions started with a vision to deliver innovative IT solutions." },
  { id: "2", year: "2019", title: "First Major Client", description: "Secured first enterprise client and expanded the team to 15 members." },
  { id: "3", year: "2020", title: "Digital Marketing Division", description: "Launched dedicated digital marketing services division." },
  { id: "4", year: "2021", title: "AI Solutions Launch", description: "Expanded into AI/ML development and launched AI solutions vertical." },
  { id: "5", year: "2023", title: "50+ Projects Delivered", description: "Crossed 50 successful project deliveries across multiple industries." },
  { id: "6", year: "2024", title: "Global Expansion", description: "Started serving clients globally with remote development teams." },
];

export default function JourneyPage() {
  return (
    <AdminLayout>
      <PageHeader title="Company Journey" buttonLabel="Add Milestone" buttonHref="/company/journey/add" />
      <div className="space-y-4">
        {milestones.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6 items-start">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-bold text-lg shrink-0">
              {m.year}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{m.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{m.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm text-accent-500 hover:underline">Edit</button>
              <button className="text-sm text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
