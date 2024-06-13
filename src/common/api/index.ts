import axios from "axios";

export const get24Results = async () => {
  const reqUrl = "/neet-result/data/2024.json";

  try {
    const res = await axios.get(reqUrl);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
