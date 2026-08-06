"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AIServicesPage() {
  return <SubPageListWrapper config={subPageConfigs["ai-solutions"]} />;
}
