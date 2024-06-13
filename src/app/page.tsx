"use client";

import { use24ResultsQuery } from "@/query/use-24-results-query";
import { ResultsTable } from "@/components/results-table";

export default function Home() {
  const { data, isLoading } = use24ResultsQuery();

  return (
    <main className="container">
      <header className="text-center my-8">
        <h1 className="font-medium tracking-tighter text-xl md:text-2xl">Exam Results</h1>
        <p className="mx-auto text-secondary-foreground text-sm max-w-60 md:max-w-none">
          This is not complete yet, more data will be added soon.
        </p>
      </header>

      <section>
        <ResultsTable
          data={[
            {
              id: "728ed52f",
              amount: 100,
              status: "pending",
              email: "m@example.com",
            },
            {
              id: "728ed52f",
              amount: 100,
              status: "pending",
              email: "a@example.com",
            },
            {
              id: "hbaerag",
              amount: 10,
              status: "pending",
              email: "b@example.com",
            },
            {
              id: "sdasd",
              amount: 90,
              status: "pending",
              email: "c@example.com",
            },
          ]}
        />
      </section>
    </main>
  );
}
