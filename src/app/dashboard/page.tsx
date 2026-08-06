"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import {
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineCog,
} from "react-icons/hi";

interface DashboardData {
  [key: string]: unknown;
}

const colorMap: Record<number, string> = {
  0: "from-primary-500 to-primary-600",
  1: "from-accent-500 to-accent-600",
  2: "from-emerald-500 to-emerald-600",
  3: "from-orange-500 to-orange-600",
};

const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  0: HiOutlineDocumentText,
  1: HiOutlineEye,
  2: HiOutlineUserGroup,
  3: HiOutlineCog,
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get(endpoints.admin_dashboard);
        setData(res.data.response_data || res.data);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const statsKeys = data ? Object.keys(data).filter((k) => typeof data[k] === "number" || typeof data[k] === "string") : [];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {statsKeys.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsKeys.map((key, i) => {
            const Icon = iconMap[i % 4];
            return (
              <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[i % 4]} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, " ")}</p>
                  <p className="text-2xl font-bold text-gray-900">{String(data![key])}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!data && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-400">
          No dashboard data available
        </div>
      )}

      {data && statsKeys.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Data</h2>
          <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </AdminLayout>
  );
}
