export type Result = {
  id: string;
  displayName: string;
  marks: number | "NA";
  air: number | "NA";
};

export type IncomingResult = {
  id: string;
  day: string;
  month: string;
  year: string;
  applicationNumber: string;
  candidateName: string;
  allIndiaRank: string;
  marks: string;
  createdAt: string;
  updatedAt: string;
};
