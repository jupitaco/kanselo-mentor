import { BiSearch } from "react-icons/bi";

function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-1 items-center gap-2 ${className} border-Line rounded-xl border px-4`}
    >
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 bg-transparent! px-4 py-3 focus:outline-none"
        // defaultValue={searchValue}
        // onChange={(e) => debouncedSearch(e.target.value)}
      />
      <BiSearch className="text-grey-500" />
    </article>
  );
}

export default Search;
