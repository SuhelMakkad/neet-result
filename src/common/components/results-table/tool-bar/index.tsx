"use client";

import { Filter } from "./filter";
import { Search } from "./search";

export const ToolBar = () => {
  return (
    <div className="flex items-center gap-2">
      <Search />
      <Filter />
    </div>
  );
};
