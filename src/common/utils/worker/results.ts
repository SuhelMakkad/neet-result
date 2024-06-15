import { expose } from "comlink";
import { get24Results } from "@/api/index";
import { DATA_PER_PAGE } from "@/utils/constants";
import { operators, type FiltersSchema } from "@/components/results-table/tool-bar/filter/schema";
import type { Result } from "@/utils/types";

type GetResultsParams = {
  pageNo: number;
  pageSize: number;
  search: string;
  filters: FiltersSchema;
  sortKey: string;
  sortOrder: string;
};

export class Results {
  private results: Result[] | null = [];

  constructor() {
    this.fetchResults();
  }

  private sortByKey(data: Result[], key: string, order: string) {
    if (!key || !order) return data;

    const ascending = order === "asc";

    return data.sort((a, b) => {
      const valA = a[key as keyof Result];
      const valB = b[key as keyof Result];

      if (key === "displayName") {
        if ((!valA || valA === "NA") && (!valB || valB === "NA")) return 0;
        if (!valA || valA === "NA") return 1;
        if (!valB || valB === "NA") return -1;

        const strA = valA.toString().toLowerCase();
        const strB = valB.toString().toLowerCase();

        return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
      }

      const numA = isNaN(Number(valA)) ? -Infinity : Number(valA);
      const numB = isNaN(Number(valB)) ? -Infinity : Number(valB);

      if (numA === -Infinity && numB === -Infinity) return 0;
      if (numA === -Infinity) return 1;
      if (numB === -Infinity) return -1;

      return ascending ? numA - numB : numB - numA;
    });
  }

  private searchResults(data: Result[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) => {
      return Object.values(item).some((value) => value.toString().toLowerCase().includes(query));
    });
  }

  private applyFilters(data: Result[], filters: FiltersSchema) {
    return data.filter((item) => {
      return filters.every((filter) => {
        const { field, operator, value } = filter;
        const fieldValue = +item[field as keyof Result];

        if (!fieldValue) return false;

        switch (operator) {
          case operators.GREATER_THAN:
            return fieldValue > value;
          case operators.LESS_THAN:
            return fieldValue < value;
          case operators.GREATER_THAN_EQUAL:
            return fieldValue >= value;
          case operators.LESS_THAN_EQUAL:
            return fieldValue <= value;
          case operators.EQUAL:
            return fieldValue === value;
          case operators.NOT_EQUAL:
            return fieldValue !== value;
          default:
            return false;
        }
      });
    });
  }

  async fetchResults() {
    if (this.results?.length) {
      return true;
    }

    const res = await get24Results();
    this.results = res;

    return !!res;
  }

  getResults({
    pageNo,
    pageSize = DATA_PER_PAGE,
    search,
    filters,
    sortKey,
    sortOrder,
  }: GetResultsParams) {
    if (!this.results) {
      return null;
    }

    const sorted = sortKey ? this.sortByKey(this.results, sortKey, sortOrder) : this.results;
    const searched = search ? this.searchResults(sorted, search) : sorted;
    const filtered = filters.length ? this.applyFilters(searched, filters) : searched;

    const start = (pageNo - 1) * pageSize;
    const end = start + pageSize;

    const sliced = filtered.slice(start, end);
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);

    return { data: sliced, total, totalPages };
  }

  getTotalResults() {
    return this.results?.length ?? 0;
  }
}

expose(Results);
