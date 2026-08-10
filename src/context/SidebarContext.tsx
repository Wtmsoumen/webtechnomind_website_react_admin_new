"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

interface PageNode {
  id: number;
  page_name: string;
  slug: string;
  parent_id: number;
  children: PageNode[];
}

interface SidebarContextType {
  pageTree: PageNode[];
  loading: boolean;
  refresh: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  pageTree: [],
  loading: true,
  refresh: () => {},
});

function buildTree(pages: PageNode[]): PageNode[] {
  const map = new Map<number, PageNode>();
  pages.forEach((p) => map.set(p.id, { ...p, children: [] }));
  const roots: PageNode[] = [];
  map.forEach((node) => {
    if (!node.parent_id || node.parent_id === 0) {
      roots.push(node);
    } else {
      const parent = map.get(node.parent_id);
      if (parent) parent.children.push(node);
      else roots.push(node);
    }
  });
  return roots;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [pageTree, setPageTree] = useState<PageNode[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = useCallback(async () => {
    try {
      const { data } = await apiClient.get(endpoints.admin_pages, {
        params: { orderby: "menu_order", order: "asc", per_page: 100 },
      });
      const pages = data.response_data?.data || [];
      setPageTree(buildTree(pages));
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchPages();
  }, [fetchPages]);

  return (
    <SidebarContext.Provider value={{ pageTree, loading, refresh }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarPages() {
  return useContext(SidebarContext);
}
