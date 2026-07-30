"use client";

import Link from "next/link";

interface PageHeaderProps {
  title: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function PageHeader({ title, buttonLabel, buttonHref }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {buttonLabel && buttonHref && (
        <Link href={buttonHref} className="btn-primary text-sm">
          {buttonLabel}
        </Link>
      )}
    </div>
  );
}
