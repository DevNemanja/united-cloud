'use client';

import { IMovie } from '@/types/movies';
import { getImageUrl } from '@/utils.ts';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Button from './Button';

interface CellProps {
  movie: IMovie;
}

export default function Cell({ movie }: CellProps) {
  const handleToggleFavorites = (movie: IMovie) => {
    console.log('Movie added to fav', movie);
  };

  return (
    <div
      className={`relative overflow-hidden card`}
      onClick={() => handleToggleFavorites(movie)}
    >
      <Image
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        width={250}
        height={350}
        className='w-full h-full object-cover'
      />

      <div className='absolute bottom-0 left-0 w-full flex items-end justify-between text-white p-4 pb-8 pt-24 bg-gradient-to-t from-zinc-950'>
        <div>
          {movie.release_date && (
            <p className='text-sm text-gray-200'>
              {format(parseISO(movie.release_date), 'd MMMM yyyy')}
            </p>
          )}
          <h2 className='text-xl font-semibold leading-6'>{movie.title}</h2>
        </div>
        <Button active={false} />
      </div>
    </div>
  );
}
