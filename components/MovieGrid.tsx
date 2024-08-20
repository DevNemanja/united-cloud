import { IMovieResponse } from '@/types/movies';
import Cell from './Cell';

interface MovieGridProps {
  data: IMovieResponse;
}

export default function MovieGrid({ data }: MovieGridProps) {
  return (
    <>
      {data.movies.map((movie) => (
        <Cell key={movie.id} movie={movie} />
      ))}
    </>
  );
}
