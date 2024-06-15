import { Loader2 } from "lucide-react";

export const State = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex items-center gap-1 justify-center h-[calc(100vh-25rem)] text-muted-foreground">
      {children}
    </div>
  );
};

export const Loading = () => {
  return (
    <State>
      <Loader2 className="animate-spin w-4 h-4" />
      Loading...
    </State>
  );
};

export const Error = () => {
  return <State> Something went wrong </State>;
};
