import Image from 'next/image';
import Logo from '@/assets/UC-logo.svg';
import { IMovieResponse } from '@/types/movies';
import { getMovies } from '@/services/movies';

export default async function Home() {
  const data: IMovieResponse = await getMovies();

  return (
    <div className='bg-slate-950 text-white'>
      <div className='flex gap-4 justify-center'>
        <Image src={Logo} alt='United Cloud logo' />
        <h1 className='text-4xl text-center py-10'>
          United Cloud Movie Database
        </h1>
      </div>
      {data.movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}
