"use client";

import { useResultsFetch } from "@/query/use-results-query";

import { ResultsTable } from "@/components/results-table";
import { Error, Loading } from "./page-states";

export const Results = () => {
  const { data: isDone, isLoading, isError } = useResultsFetch();
  if (isLoading) {
    return <Loading />;
  }

  if (isError || !isDone) {
    return <Error />;
  }

  return (
    <section>
      <ResultsTable />
    </section>
  );
};
