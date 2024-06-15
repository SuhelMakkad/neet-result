"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterState, filtersSchema } from "@/components/results-table/tool-bar/filter/schema";
import { scrollToTop } from "@/utils/helpers";

type updateSearchParamArg = {
  key: string;
  value: string;
}[];

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

  const updateSearchParam = (params: updateSearchParamArg) => {
    const newSearchParam = new URLSearchParams(searchParam.toString());
    params.forEach(({ key, value }) => {
      newSearchParam.set(key, value);
    });

    router.push(`/?${newSearchParam.toString()}`, {
      scroll: false,
    });
    scrollToTop();
  };

  const updatePageNo = (pageNo: number) => {
    updateSearchParam([
      {
        key: "page",
        value: pageNo.toString(),
      },
    ]);
  };

  const updatePageSize = (pageSize: string) => {
    updateSearchParam([
      {
        key: "pageSize",
        value: pageSize,
      },
    ]);
  };

  const updateSearch = (search: string) => {
    updateSearchParam([
      {
        key: "search",
        value: search || "",
      },
      {
        key: "page",
        value: "1",
      },
    ]);
  };

  const updateSort = (sortKey: string, sortOrder: string) => {
    updateSearchParam([
      {
        key: "sortKey",
        value: sortKey || "",
      },
      {
        key: "sortOrder",
        value: sortOrder || "",
      },
      {
        key: "page",
        value: "1",
      },
    ]);
  };

  const updateFilters = (filters: FilterState[]) => {
    updateSearchParam([
      {
        key: "filters",
        value: JSON.stringify(filters),
      },
      {
        key: "page",
        value: "1",
      },
    ]);
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
