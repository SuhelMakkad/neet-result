import { useQuery } from "@tanstack/react-query";
import { useWorker } from "@/components/worker-context/use-worker";

export const useResultsFetch = () => {
  const { worker, isLoaded } = useWorker();

  return useQuery({
    queryKey: ["results-fetch", isLoaded],
    queryFn: () => worker?.fetchResults() || false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isLoaded,
  });
};

export const useResults = (page: number, pageSize?: number) => {
  const { worker, isLoaded } = useWorker();

  return useQuery({
    queryKey: ["results", page, pageSize, isLoaded],
    queryFn: () => worker?.getResults(page, pageSize),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isLoaded,
  });
};
