"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function IndustriesPage() {
  return <SubPageListWrapper config={subPageConfigs["industries"]} />;
}
