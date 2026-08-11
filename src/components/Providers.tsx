"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { PostTypeFilterProvider } from "@/context/PostTypeFilterContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PostTypeFilterProvider>
        <SidebarProvider>
          <Toaster position="top-right" />
          {children}
        </SidebarProvider>
      </PostTypeFilterProvider>
    </AuthProvider>
  );
}
