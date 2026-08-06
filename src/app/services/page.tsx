"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function ServicesPage() {
  return <SubPageListWrapper config={subPageConfigs["services"]} />;
}
