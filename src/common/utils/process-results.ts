import { IncomingResult, Result } from "@/utils/types";

export const processResults = (results: IncomingResult[]): Result[] => {
  return results.map((result) => ({
    id: result.applicationNumber || "NA",
    displayName: result.candidateName || "NA",
    marks: +result.marks || -1,
    air: +result.allIndiaRank || -1,
  }));
};
