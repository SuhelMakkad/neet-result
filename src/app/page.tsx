import { Results } from "./components/results";

export default function Home() {
  return (
    <main className="container mb-6">
      <header className="text-center mt-6 mb-10">
        <h1 className="font-medium tracking-tighter text-xl md:text-2xl">Exam Results</h1>
        <p className="mx-auto text-secondary-foreground text-sm max-w-60 md:max-w-none">
          This is not complete yet, more data will be added soon.
        </p>
      </header>

      <Results />
    </main>
  );
}
