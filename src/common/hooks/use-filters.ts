"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterState, filtersSchema } from "@/components/results-table/tool-bar/filter/schema";
import { scrollToTop } from "@/utils/helpers";

export const useFilters = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const pageNo = +(searchParam.get("page")?.toString() || 1);
  const pageSize = +(searchParam.get("pageSize")?.toString() || 10);
  const search = searchParam.get("search")?.toString() || "";
  const sortKey = searchParam.get("sortKey")?.toString() || "";
  const sortOrder = searchParam.get("sortOrder")?.toString() || "";

  const filtersStr = searchParam.get("filters")?.toString();
  const filters = useMemo(() => {
    if (!filtersStr) return [];
    try {
      const parsedData = JSON.parse(filtersStr);
      const res = filtersSchema.safeParse(parsedData);

      return res.success ? res.data : [];
    } catch (error) {
      return [];
    }
  }, [filtersStr]);

  const updateSearchParam = (key: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam.toString());
    newSearchParam.set(key, value);

    router.push(`/?${newSearchParam.toString()}`, {
      scroll: false,
    });
    scrollToTop();
  };

  const updatePageNo = (pageNo: number) => {
    updateSearchParam("page", pageNo.toString());
  };

  const updatePageSize = (pageSize: string) => {
    updateSearchParam("pageSize", pageSize);
  };

  const updateSearch = (search: string) => {
    updateSearchParam("search", search || "");
  };

  const updateSort = (sortKey: string, sortOrder: string) => {
    const newSearchParam = new URLSearchParams(searchParam.toString());
    newSearchParam.set("sortKey", sortKey || "");
    newSearchParam.set("sortOrder", sortOrder || "");

    router.push(`/?${newSearchParam.toString()}`, {
      scroll: false,
    });
    scrollToTop();
  };

  const updateFilters = (filters: FilterState[]) => {
    updateSearchParam("filters", JSON.stringify(filters));
  };

  return {
    pageNo,
    pageSize,
    search,
    sortKey,
    sortOrder,
    filters,
    updatePageNo,
    updatePageSize,
    updateSearch,
    updateFilters,
    updateSort,
  };
};
