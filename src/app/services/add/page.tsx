"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddServicePage() {
  return <SubPageFormWrapper config={subPageConfigs["services"]} />;
}
