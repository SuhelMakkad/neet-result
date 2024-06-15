import { useQuery } from "@tanstack/react-query";
import { useWorker } from "@/components/worker-context/use-worker";
import { useFilters } from "@/hooks/use-filters";

export const useResultsFetch = () => {
  const { worker, isLoaded } = useWorker();

  return useQuery({
    queryKey: ["results-fetch", isLoaded],
    queryFn: () => worker?.fetchResults() || false,
    enabled: isLoaded,
  });
};

export const useResults = () => {
  const { worker, isLoaded } = useWorker();
  const { pageNo, pageSize, search, filters, sortKey, sortOrder } = useFilters();

  return useQuery({
    queryKey: ["results", isLoaded, pageNo, pageSize, search, filters, sortKey, sortOrder],
    queryFn: () => worker?.getResults({ pageNo, pageSize, search, filters, sortKey, sortOrder }),
    enabled: isLoaded,
  });
};
