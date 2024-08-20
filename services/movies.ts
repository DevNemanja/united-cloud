import { IMovieResponse } from '@/types/movies';

export const getMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
  const movies: IMovieResponse = await res.json();

  return movies;
};
