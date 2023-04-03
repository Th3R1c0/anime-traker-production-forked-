"use client";
import { useAnimeStore, useSearchStore } from "../lib/store.ts";
import { useState } from "react";
const SearchBar = () => {
  //const [filter, setFilter] = useState("");
  const filter = useSearchStore((state) => state.searchTerm);
  const handleSearch = useSearchStore((state) => state.updateSearchTerm);
  const [searchQuery, setSearchQuery] = useState("Fate/Zero");
  // const handleSearch = (event) => {
  //   const newFilter = event.target.value;
  //   //setFilter(newFilter);
  //   setSearchQuery(newFilter);
  // };
  return (
    <div className="w-full text-[#EEEEEE] h-max p-4  flex flex-col justify-center items-center">
      <h2> Search Thousands of Anime </h2>
      <input
        className="input input-bordered w-full max-w-xs text-black"
        type="text"
        value={filter}
        onChange={(i) => handleSearch(i.target.value)}
      />
    </div>
  );
};

export default SearchBar;
