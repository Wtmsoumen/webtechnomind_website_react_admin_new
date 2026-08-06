"use client";

import SubPageFormWrapper from "@/components/SubPageFormWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function AddDigitalMarketingPage() {
  return <SubPageFormWrapper config={subPageConfigs["digital-marketing"]} />;
}
