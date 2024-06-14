import { useFilters } from "@/hooks/use-filters";
import { Input } from "@/components/ui/input";

export const Search = () => {
  const { search, updateSearch } = useFilters();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const search = formData.get("search") as string;
        updateSearch(search);
      }}
    >
      <Input
        type="search"
        placeholder="Search..."
        className="max-w-96"
        defaultValue={search}
        onBlur={(e) => {
          updateSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "Enter") {
            updateSearch(target.value);
            (document.activeElement as HTMLElement)?.blur();
          }
        }}
      />
    </form>
  );
};
