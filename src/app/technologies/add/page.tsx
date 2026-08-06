"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddTechnologyPage() {
  return <SubPageFormWrapper config={subPageConfigs["technologies"]} />;
}
