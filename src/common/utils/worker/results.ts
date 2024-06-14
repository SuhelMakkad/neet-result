import { expose } from "comlink";
import { get24Results } from "@/api/index";
import { DATA_PER_PAGE } from "@/utils/constants";
import type { Result } from "@/utils/types";

export class Results {
  private results: Result[] | null = [];

  constructor() {
    this.fetchResults();
  }

  async fetchResults() {
    if (this.results?.length) {
      return true;
    }

    const res = await get24Results();
    this.results = res;

    return !!res;
  }

  getResults(page: number, pageSize: number = DATA_PER_PAGE) {
    if (!this.results) {
      return null;
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const sliced = this.results.slice(start, end);
    const total = this.results.length;
    const totalPages = Math.ceil(total / pageSize);

    return { data: sliced, total, totalPages };
  }

  getTotalResults() {
    return this.results?.length ?? 0;
  }
}

expose(Results);
