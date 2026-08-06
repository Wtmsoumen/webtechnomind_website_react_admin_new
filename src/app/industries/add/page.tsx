"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddIndustryPage() {
  return <SubPageFormWrapper config={subPageConfigs["industries"]} />;
}
