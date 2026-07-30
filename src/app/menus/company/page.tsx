"use client";

import MenuListPage from "@/components/MenuListPage";
import { sampleCompanyMenus } from "@/lib/sampleData";

const statusRender = (row: Record<string, unknown>) => (
  <span className={row.status === "Active" ? "bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full" : "bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"}>
    {String(row.status)}
  </span>
);

const columns = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "parentCompany", label: "Parent Company" },
  { key: "order", label: "Order" },
  { key: "status", label: "Status", render: statusRender },
];

export default function CompanyMenuListPage() {
  return (
    <MenuListPage
      title="Company Menu List"
      breadcrumb="Company Menu"
      addLabel="Add Menu"
      addHref="/menus/company/add"
      editBasePath="/menus/company/edit"
      columns={columns}
      data={sampleCompanyMenus as unknown as Record<string, unknown>[]}
      showManageOrder={false}
    />
  );
}
