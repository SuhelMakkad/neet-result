"use client";

import { use24ResultsQuery } from "@/query/use-24-results-query";

import { ResultsTable } from "@/components/results-table";
import { Error, Loading } from "./page-states";

export const Results = () => {
  const { data, isLoading, isError } = use24ResultsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data?.length) {
    return <Error />;
  }

  return (
    <section>
      <ResultsTable data={data} />
    </section>
  );
};
