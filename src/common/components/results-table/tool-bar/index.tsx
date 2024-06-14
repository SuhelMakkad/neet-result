"use client";

import { Input } from "@/components/ui/input";
import { Filter } from "./filter";

export const ToolBar = () => {
  return (
    <div className="flex items-center gap-2">
      <Input type="search" placeholder="Search..." className="max-w-96" />
      <Filter />
    </div>
  );
};
