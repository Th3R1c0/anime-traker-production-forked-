"use client";
import Animelist from "../../../components/animelist";
import SearchBar from "../../../components/searchbar";
import Results from "../../../components/searchresults";

export default function Search() {
  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar />
      <Results />
    </div>
  );
}
