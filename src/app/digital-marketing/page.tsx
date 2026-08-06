"use client";

import SubPageListWrapper from "@/components/SubPageListWrapper";
import { subPageConfigs } from "@/lib/subpage-config";

export default function DigitalMarketingPage() {
  return <SubPageListWrapper config={subPageConfigs["digital-marketing"]} />;
}
