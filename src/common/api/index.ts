import axios from "axios";
import { processResults } from "@/utils/process-results";
import { IncomingResult } from "@/utils/types";

type Get24ResultsResponse = {
  len: number;
  total: IncomingResult[];
};

export const get24Results = async () => {
  const reqUrl = "/neet-result/data/2024.json";

  try {
    const res = await axios.get<Get24ResultsResponse>(reqUrl);
    if (!res.data?.total) {
      return null;
    }

    return processResults(res.data.total);
  } catch (err) {
    console.error(err);
    return null;
  }
};
