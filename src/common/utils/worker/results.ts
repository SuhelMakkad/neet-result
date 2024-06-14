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
};

export class Results {
  private results: Result[] | null = [];

  constructor() {
    this.fetchResults();
  }

  private searchResults(search: string) {
    if (!this.results) {
      return null;
    }

    const query = search.toLowerCase().trim();
    return this.results.filter((item) => {
      return Object.values(item).some((value) => value.toString().toLowerCase().includes(query));
    });
  }

  private applyFilters(filters: FiltersSchema) {
    if (!this.results) {
      return null;
    }

    return this.results.filter((item) => {
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

  getResults({ pageNo, pageSize = DATA_PER_PAGE, search, filters }: GetResultsParams) {
    const searched = search ? this.searchResults(search) : this.results;
    if (!searched) {
      return null;
    }

    const filtered = filters.length ? this.applyFilters(filters) : searched;
    if (!filtered) {
      return null;
    }

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
