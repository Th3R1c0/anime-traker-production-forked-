interface IAnime {
  id: number;
  episodes: number;
  title: {
    native: string;
    english: string;
  };
  status: string;
}

interface animemodel {
  //implement in prisma model
  id: number;
  CurrentEpisode: number;
  rating: number;
  status: string;
}