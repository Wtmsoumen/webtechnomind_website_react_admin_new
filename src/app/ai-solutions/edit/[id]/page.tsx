"use client";

import { use } from "react";
import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function EditAIServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <SubPageFormWrapper config={subPageConfigs["ai-solutions"]} pageId={id} />;
}
