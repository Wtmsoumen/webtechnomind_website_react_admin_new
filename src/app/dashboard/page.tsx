"use client";

import AdminLayout from "@/components/AdminLayout";
import StatsCard from "@/components/StatsCard";
import {
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineSpeakerphone,
  HiOutlineStar,
  HiOutlineTemplate,
  HiOutlineUserGroup,
  HiOutlineNewspaper,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="AI Solutions" value={7} icon={HiOutlineLightBulb} trend="Active services" color="pink" />
        <StatsCard title="Web & Software" value={7} icon={HiOutlineCode} color="blue" />
        <StatsCard title="Digital Marketing" value={7} icon={HiOutlineSpeakerphone} trend="+1 new" color="green" />
        <StatsCard title="Client Reviews" value={48} icon={HiOutlineStar} trend="+5 this week" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "New lead received", item: "AI Chatbot Development inquiry", time: "2 hours ago" },
              { action: "Blog post published", item: "AI Solutions for SMEs", time: "5 hours ago" },
              { action: "Portfolio updated", item: "Timble — Dating Platform", time: "1 day ago" },
              { action: "Quote request", item: "E-commerce Development — $25k", time: "2 days ago" },
              { action: "Case study published", item: "FinTech AI Chatbot", time: "3 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.item}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Portfolio Projects", value: 7, icon: HiOutlineTemplate },
              { label: "Industries Served", value: 7, icon: HiOutlineOfficeBuilding },
              { label: "Blog Posts", value: 4, icon: HiOutlineNewspaper },
              { label: "New Leads", value: 12, icon: HiOutlineUserGroup },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                <item.icon className="w-6 h-6 mx-auto text-primary-500 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
