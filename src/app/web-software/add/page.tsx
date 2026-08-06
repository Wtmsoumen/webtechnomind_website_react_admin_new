"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddWebSoftwarePage() {
  return <SubPageFormWrapper config={subPageConfigs["web-software"]} />;
}
