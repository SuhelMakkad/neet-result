import axios from "axios";
import { processResults } from "@/utils/process-results";

export const get24Results = async () => {
  const reqUrl = "/neet-result/data/2024.json";

  try {
    const res = await axios.get(reqUrl);
    return processResults(res.data);
  } catch (err) {
    console.error(err);
    return null;
  }
};
