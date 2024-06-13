import { IncomingResult, Result } from "@/utils/types";

const extractNumber = (str: string) => {
  const regex = /^\d+/;
  const match = str.match(regex);
  return match ? +match[0] : null;
};

export const processResults = (results: IncomingResult[]): Result[] => {
  return results.map((result) => ({
    id: result.applicationNumber || "NA",
    displayName: result.candidateName || "NA",
    marks: extractNumber(result.marks) || "NA",
    air: +result.allIndiaRank || "NA",
  }));
};
