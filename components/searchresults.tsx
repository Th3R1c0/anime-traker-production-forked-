import { useAnimeStore, useSearchStore } from "../lib/store.ts";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { getClient } from "../lib/client";
const GET_ANIME = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
        id
        episodes
        title {
          romaji
          english
          native
        }
      }
    }
  }
`;
const Results = () => {
  const client = getClient();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const addAnime = useAnimeStore((state) => state.addAnime);
  const anime = useAnimeStore((state) => state.anime);
  const [currentpage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  const { loading, error, data, refetch } = useQuery(GET_ANIME, {
    client,
    variables: {
      search: searchTerm,
      page: 1,
      perPage: 5,
    },
  });
  const alreadyAddedAnime = (id) => {
    return anime.filter((Anime) => Anime.id === id).length > 0 ? true : false;
  };
  const handlePagination = (type) => {
    const newPage = type === "next" ? currentpage + 1 : currentpage - 1;
    setCurrentPage(newPage);
    refetch({ search: searchTerm, page: newPage, perPage: 5 });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center font-2xl">
        <progress className="progress w-56 progress-success"></progress>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full justify-between align-center p-4">
      <div className="flex flex-col w-full p-4">
        <hr />
        <div className="flex flex-col w-full h-full space-y-8 ">
          {data.Page.media.map((media) => (
            <div
              key={media.id}
              className="flex w-full h-max p-8 bg-[#393E46] rounded-md"
            >
              <div className="flex-1">
                {media.title.native}-{media.title.english}
              </div>
              {alreadyAddedAnime(media.id) ? (
                <div> already added </div>
              ) : (
                <button
                  onClick={() =>
                    addAnime({
                      id: media.id,
                      episodes: media.episodes,
                      title: {
                        native: media.title.native,
                        english: media.title.english,
                      },
                      status: "watching",
                    })
                  }
                >
                  Add
                </button>
              )}
            </div>
          ))}{" "}
        </div>
      </div>
      <div>
        <button
          disabled={
            !data.Page.pageInfo.hasNextPage && data.Page.pageInfo.total != 0
              ? false
              : true
          }
          className="btn"
          onClick={() => handlePagination("prev")}
        >
          {" "}
          prev{" "}
        </button>

        <button
          disabled={!data.Page.pageInfo.hasNextPage}
          className="btn"
          onClick={() => handlePagination("next")}
        >
          next{" "}
        </button>
      </div>
    </div>
  );
};

export default Results;
