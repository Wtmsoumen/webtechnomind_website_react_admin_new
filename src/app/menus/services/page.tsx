"use client";

import MenuListPage from "@/components/MenuListPage";
import { sampleServiceMenus } from "@/lib/sampleData";

const statusRender = (row: Record<string, unknown>) => (
  <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
    {String(row.status)}
  </span>
);

const columns = [
  { key: "name", label: "Name" },
  { key: "parent", label: "Parent" },
  { key: "status", label: "Status", render: statusRender },
  { key: "order", label: "Order" },
];

export default function ServicesMenuPage() {
  return (
    <MenuListPage
      title="Services Menu List"
      breadcrumb="Services Menu"
      addLabel="Add Menu"
      addHref="/menus/services/add"
      editBasePath="/menus/services/edit"
      columns={columns}
      data={sampleServiceMenus as unknown as Record<string, unknown>[]}
    />
  );
}
