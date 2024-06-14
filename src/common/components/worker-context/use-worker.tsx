"use client";

import { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import { Remote, wrap } from "comlink";
import type { Results as ResultsType } from "@/utils/worker/results";

const WorkerContext = createContext<{
  workerRef: MutableRefObject<Remote<ResultsType> | null>;
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
} | null>(null);

export const WorkerProvider = ({ children }: React.PropsWithChildren) => {
  const workerRef = useRef<Remote<ResultsType> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <WorkerContext.Provider value={{ workerRef, isLoaded, setIsLoaded }}>
      {children}
    </WorkerContext.Provider>
  );
};

export const useWorker = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error("useWorker must be used within a WorkerProvider");
  }

  useEffect(() => {
    if (typeof Worker === "undefined") {
      return;
    }

    context.setIsLoaded(false);

    let worker: Worker;
    const setWorker = async () => {
      worker = new Worker(new URL("@/utils/worker/results", import.meta.url));

      const Results = wrap(worker) as any;
      const results = (await new Results()) as Remote<ResultsType>;

      context.workerRef.current = results;
      context.setIsLoaded(true);
    };

    setWorker();

    return () => worker?.terminate?.();
  }, []);

  return { worker: context.workerRef.current, isLoaded: context.isLoaded };
};
