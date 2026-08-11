"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { usePostTypeFilter } from "@/context/PostTypeFilterContext";

interface RawPage {
  id: number;
  page_name: string;
  slug: string;
  parent_id: number;
  posttype: string;
}

interface PageNode {
  id: number;
  page_name: string;
  slug: string;
  parent_id: number;
  posttype: string;
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

function buildTree(pages: RawPage[]): PageNode[] {
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

function buildFilteredTree(pages: RawPage[], posttype: string): PageNode[] {
  const filtered = pages.filter((p) => p.posttype === posttype);
  const idSet = new Set(filtered.map((p) => p.id));
  const map = new Map<number, PageNode>();
  filtered.forEach((p) => map.set(p.id, { ...p, children: [] }));
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
  const [allPages, setAllPages] = useState<RawPage[]>([]);
  const [loading, setLoading] = useState(true);
  const { postTypeFilter } = usePostTypeFilter();

  const fetchPages = useCallback(async () => {
    try {
      const { data } = await apiClient.get(endpoints.admin_pages, {
        params: { orderby: "menu_order", order: "asc", per_page: 100 },
      });
      setAllPages(data.response_data?.data || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const pageTree = useMemo(() => {
    if (!postTypeFilter) return buildTree(allPages);
    const filtered = allPages.filter((p) => p.posttype === postTypeFilter);
    console.log("Filter:", postTypeFilter, "Sample posttypes:", allPages.slice(0, 5).map(p => ({ id: p.id, posttype: p.posttype, type: typeof p.posttype })));
    return buildFilteredTree(allPages, postTypeFilter);
  }, [allPages, postTypeFilter]);

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
