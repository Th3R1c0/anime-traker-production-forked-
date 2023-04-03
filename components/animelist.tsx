"use client";
import { useAnimeStore } from "../lib/store";
import { useEffect } from "react";
import { useState } from "react";


const AnimeList = () => {
  const animelist = useAnimeStore((state) => state.anime);
  
  const setFilter = useAnimeStore((state) => state.setFilter);
  const updateAnime = useAnimeStore((state) => state.updateAnime);
  const watchStatus = ["planning", "completed", "watching"];
  const deleteAnime = useAnimeStore((state) => state.deleteAnime);
  const [isEditing, setIsEditing] = useState(0);
  const handleUpdateStatus = (event, anime) => {
    setIsEditing(0);
    updateAnime(anime, "status", event);
  };

  const Statusbar = ({ anime }) => {
    console.log(anime.episodes);
    // return isEditing === anime.id ? (
    //   <>
    //     <select
    //       className="select select-success max-w-xs"
    //       onChange={(event) => handleUpdateStatus(event, anime)}
    //     >
    //       {watchStatus.map((option, index) => {
    //         return <option key={index}>{option}</option>;
    //       })}
    //     </select>
    //     <button onClick={() => setIsEditing(0)}>x</button>
    //   </>
    // ) : (
    //   <div>
    //     <div onClick={() => setIsEditing(anime.id)}>status: {anime.status}</div>

    //     {anime.episodes !== null && typeof anime.episodes === "number" && (
    //       <>
    //         episode
    //         <select>
    //           {[...Array(anime.episodes)].map((_, index) => (
    //             <option key={index}>{index + 1}</option>
    //           ))}
    //         </select>
    //       </>
    //     )}
    //   </div>
    // );

    return (
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          status: {anime.status}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-4  text-[#222831] bg-gray-200 shadow rounded-box w-52"
        >
          {watchStatus.map((option, index) => {
            return (
              <li
                className="cursor-pointer hover:bg-gray-400 p-4 rounded-md"
                onClick={() => {
                  handleUpdateStatus(option, anime);
                }}
                key={index}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const Episodes = ({ anime }) => {
    return (
      <div className="flex flex-col w-max h-max bg-red-200">
        {anime.episodes !== null && typeof anime.episodes === "number" && (
          <>
            <span>episode</span>
            <select className="select select-success w-max h-[10px ] p-0">
              {[...Array(anime.episodes)].map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </select>
          </>
        )}
      </div>
    );
  };

  const [filterd, setFilterd] = useState(false);
  return (
    <div className="flex flex-col w-full h-full p-8">
      <h3> My Anime </h3>
      filters:
      {/* <select onChange={(event) => setFilter(event.target.value)}>
        {watchStatus.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select> */}
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          filter by watch status: {filterd}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-4  text-[#222831] bg-gray-200 shadow rounded-box w-52"
        >
          {watchStatus.map((option, index) => {
            return (
              <li
                className="cursor-pointer hover:bg-gray-400 p-4 rounded-md"
                onClick={() => {
                  setFilterd(option);
                  setFilter(option);
                }}
                key={index}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col w-full h-full p-4 space-y-8">
        {animelist.length > 0 ? (
          animelist.map((anime) => {
            return (
              <div
                key={anime.id}
                className="flex w-full h-max  p-8 bg-[#393E46] rounded-md"
              >
                <div className="flex-1">
                  {anime.title.native}-{anime.title.english}
                </div>
                <Statusbar anime={anime} />
                <Episodes anime={anime} />

                <button onClick={() => deleteAnime(anime)}>Delete</button>
              </div>
            );
          })
        ) : (
          <div className="m-8">Your anime list is empty </div>
        )}
      </div>
    </div>
  );
};

export default AnimeList;
