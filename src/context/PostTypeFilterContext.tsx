"use client";

import { createContext, useContext, useState, useEffect } from "react";
import apiClient, { getToken } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/context/AuthContext";

interface PostTypeFilterContextType {
  postTypeFilter: string;
  setPostTypeFilter: (v: string) => void;
  postTypeOptions: Record<string, string>;
}

const PostTypeFilterContext = createContext<PostTypeFilterContextType>({
  postTypeFilter: "",
  setPostTypeFilter: () => {},
  postTypeOptions: {},
});

export function PostTypeFilterProvider({ children }: { children: React.ReactNode }) {
  const [postTypeFilter, setPostTypeFilter] = useState("");
  const [postTypeOptions, setPostTypeOptions] = useState<Record<string, string>>({});
  const { user } = useAuth();

  useEffect(() => {
    if (!getToken()) return;
    apiClient
      .get(endpoints.admin_pages, { params: { per_page: 1 } })
      .then(({ data }) => {
        if (data.POST_TYPE_ARRAY) setPostTypeOptions(data.POST_TYPE_ARRAY);
      })
      .catch(() => {});
  }, [user]);

  return (
    <PostTypeFilterContext.Provider value={{ postTypeFilter, setPostTypeFilter, postTypeOptions }}>
      {children}
    </PostTypeFilterContext.Provider>
  );
}

export function usePostTypeFilter() {
  return useContext(PostTypeFilterContext);
}
