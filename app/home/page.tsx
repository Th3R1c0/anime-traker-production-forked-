"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import React from "react";

import { useAnimeStore, useSearchStore } from "../../lib/store;
interface IAnime {
  id: number;
  episodes: number;
  title: {
    native: string;
    english: string;
  };
  status: string;
}
export default function Page() {
  const addAnime = useAnimeStore((state) => state.addAnime);
  const devRef = useRef(false);
  useEffect(() => {
    if ((devRef.current = false)) {
      devRef.current = true;

      (async () => {
        const res = await fetch(`/api/getuseranime/${1}`);
        const listofanime = await res.json();
        for (let i = 0; i < listofanime.length; i++) {
          const animeEntry: IAnime = {
            id: listofanime[i].id,
            episodes: 3, //listofanime[i].episodes,
            title: {
              native: listofanime[i].title,
              english: listofanime[i].title,
            },
            status: "watching",
          };
          addAnime(animeEntry);
        }
      })();
    }
  }, []);
  return (
    <div>
      <h1> Anime tracker </h1>
      trending stuff here n stuff
      {/* <Pagnation /> */}
    </div>
  );
}
