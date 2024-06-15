"use client";

import { useResultsFetch } from "@/query/use-results-query";

import { ResultsTable } from "@/components/results-table";
import { Error, Loading } from "./page-states";

export const Results = () => {
  const { data: hasData, isLoading, isError } = useResultsFetch();

  if (isLoading || !hasData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section>
      <ResultsTable />
    </section>
  );
};
