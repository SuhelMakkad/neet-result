import { expose } from "comlink";
import { get24Results } from "@/api/index";
import { DATA_PER_PAGE } from "@/utils/constants";
import type { Result } from "@/utils/types";

type GetResultsParams = {
  pageNo: number;
  pageSize: number;
  search: string;
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

  async fetchResults() {
    if (this.results?.length) {
      return true;
    }

    const res = await get24Results();
    this.results = res;

    return !!res;
  }

  getResults({ pageNo, pageSize = DATA_PER_PAGE, search }: GetResultsParams) {
    const searched = search ? this.searchResults(search) : this.results;
    if (!searched) {
      return null;
    }

    const start = (pageNo - 1) * pageSize;
    const end = start + pageSize;

    const sliced = searched.slice(start, end);
    const total = searched.length;
    const totalPages = Math.ceil(total / pageSize);

    return { data: sliced, total, totalPages };
  }

  getTotalResults() {
    return this.results?.length ?? 0;
  }
}

expose(Results);
