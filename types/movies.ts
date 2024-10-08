export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  video: boolean;
  ratings: {
    id: string;
    rating: number;
  }[];
  release_date?: string;
}

export interface IMovieResponse {
  length: number;
  movies: IMovie[];
}
