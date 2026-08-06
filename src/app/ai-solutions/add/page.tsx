"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddAIServicePage() {
  return <SubPageFormWrapper config={subPageConfigs["ai-solutions"]} />;
}
