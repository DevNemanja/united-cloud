import path from 'path';
import { promises as fs } from 'fs';
import { IMovie } from '@/types/movies';

export async function getUniqueDataFromJson(pathString: string) {
  const filePath = path.join(process.cwd(), pathString);
  const jsonData = await fs.readFile(filePath, 'utf8');
  const movies: IMovie[] = JSON.parse(jsonData);

  return movies;
}
