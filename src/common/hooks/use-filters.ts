"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useFilters = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const pageNo = +(searchParam.get("page")?.toString() || 1);
  const pageSize = +(searchParam.get("pageSize")?.toString() || 10);

  const updateSearchParam = (key: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam.toString());
    newSearchParam.set(key, value);

    router.push(`/?${newSearchParam.toString()}`, {
      scroll: false,
    });
  };

  const updatePageNo = (pageNo: number) => {
    updateSearchParam("page", pageNo.toString());
  };

  const updatePageSize = (pageSize: string) => {
    updateSearchParam("pageSize", pageSize);
  };

  return {
    pageNo,
    pageSize,
    updatePageNo,
    updatePageSize,
  };
};
