import path from 'path';
import { promises as fs } from 'fs';
import { IMovie } from '@/types/movies';

export function removeDuplicates(movies: IMovie[]): IMovie[] {
  const uniqueMovies = new Map<number, IMovie>();

  for (const movie of movies) {
    uniqueMovies.set(movie.id, movie);
  }

  return Array.from(uniqueMovies.values());
}

export async function getUniqueDataFromJson(pathString: string) {
  const filePath = path.join(process.cwd(), pathString);
  const jsonData = await fs.readFile(filePath, 'utf8');
  const movies: IMovie[] = JSON.parse(jsonData);

  return sortByImdbRating(removeDuplicates(movies));
}

function sortByImdbRating(movies: IMovie[]): IMovie[] {
  return movies.sort((a, b) => {
    const imdbRatingA =
      a.ratings.find((rating) => rating.id === 'imdb')?.rating || 0;
    const imdbRatingB =
      b.ratings.find((rating) => rating.id === 'imdb')?.rating || 0;

    return imdbRatingB - imdbRatingA;
  });
}
