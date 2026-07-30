"use client";

import MenuListPage from "@/components/MenuListPage";
import { sampleIndustries } from "@/lib/sampleData";

const statusRender = (row: Record<string, unknown>) => (
  <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
    {String(row.status)}
  </span>
);

const columns = [
  { key: "name", label: "Industry Name" },
  { key: "parent", label: "Parent" },
  { key: "status", label: "Status", render: statusRender },
  { key: "order", label: "Order" },
];

export default function IndustryListPage() {
  return (
    <MenuListPage
      title="Industry List"
      breadcrumb="Industry"
      addLabel="Add Industry"
      addHref="/menus/industry/add"
      editBasePath="/menus/industry/edit"
      columns={columns}
      data={sampleIndustries as unknown as Record<string, unknown>[]}
    />
  );
}
