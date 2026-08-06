"use client";

import { use } from "react";
import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <SubPageFormWrapper config={subPageConfigs["services"]} pageId={id} />;
}
