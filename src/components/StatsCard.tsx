"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: "pink" | "blue" | "green" | "orange";
}

const colorMap = {
  pink: "from-primary-500 to-primary-600",
  blue: "from-accent-500 to-accent-600",
  green: "from-emerald-500 to-emerald-600",
  orange: "from-orange-500 to-orange-600",
};

export default function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && <p className="text-xs text-green-500 mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}
