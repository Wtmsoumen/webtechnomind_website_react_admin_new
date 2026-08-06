"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function TechnologiesPage() {
  return <SubPageListWrapper config={subPageConfigs["technologies"]} />;
}
