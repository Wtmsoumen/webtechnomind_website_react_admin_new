"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function WebSoftwarePage() {
  return <SubPageListWrapper config={subPageConfigs["web-software"]} />;
}
