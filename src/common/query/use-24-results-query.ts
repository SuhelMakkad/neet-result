import { useQuery } from "@tanstack/react-query";
import { get24Results } from "@/api/index";

export const use24ResultsQuery = () => {
  return useQuery({
    queryKey: ["24-results"],
    queryFn: () => get24Results(),
  });
};
