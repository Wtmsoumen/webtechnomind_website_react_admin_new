"use client";

import MenuListPage from "@/components/MenuListPage";
import { sampleTechMenus } from "@/lib/sampleData";

const statusRender = (row: Record<string, unknown>) => (
  <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
    {String(row.status)}
  </span>
);

const columns = [
  { key: "name", label: "Technology Menu Name" },
  { key: "parent", label: "Parent" },
  { key: "status", label: "Status", render: statusRender },
  { key: "order", label: "Order" },
];

export default function TechnologyMenuListPage() {
  return (
    <MenuListPage
      title="Technology Menu List"
      breadcrumb="Technology Menu"
      addLabel="Add Menu"
      addHref="/menus/technology/add"
      editBasePath="/menus/technology/edit"
      columns={columns}
      data={sampleTechMenus as unknown as Record<string, unknown>[]}
    />
  );
}
