import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchTerm: "Fate/Zero",
  updateSearchTerm: (query) => set((state) => ({ searchTerm: query })),
}));

const addAnime = (set) => (anime) => {
  set((state) => ({ anime: [...state.anime, anime] }));
};

const deleteAnime = (set) => (anime) => {
  set((state) => ({
    anime: state.anime.filter((Anime) => Anime.id !== anime.id),
  }));
};

const setFilter = (set) => (filter) => {
  set((state) => {
    const first = state.anime.filter((anime) => anime.status === filter);
    const rest = state.anime.filter((anime) => anime.status !== filter);
    const filteredList = [...first, ...rest];
    return { anime: filteredList };
  });
};

const updateAnime = (set) => (anime, fieldToUpdate, updatedValue) => {
  set((state) => {
    const newAnimeList = state.anime.map((Anime) => {
      if (Anime.id === anime.id) {
        return { ...Anime, [fieldToUpdate]: updatedValue };
      } else {
        return Anime;
      }
    });
    console.log(newAnimeList);
    return { anime: newAnimeList };
  });
};

export const useAnimeStore = create((set) => ({
  anime: [],
  addAnime: addAnime(set),
  deleteAnime: deleteAnime(set),
  setFilter: setFilter(set),
  updateAnime: updateAnime(set),
}));
