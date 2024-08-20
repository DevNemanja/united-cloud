'use client';

import { useRef, useEffect } from 'react';
import { IMovie } from '@/types/movies';
import { getImageUrl } from '@/utils.ts';
import Image from 'next/image';
import Button from './Button';
import { format, parseISO } from 'date-fns';

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  movie: IMovie;
  active: number;
  showActive: boolean;
  numOfCols: number;
  isFavorite: boolean;
  handleToggleFavorites: (movie: IMovie) => void;
}

export default function MovieCell({
  columnIndex,
  rowIndex,
  style,
  movie,
  active,
  showActive,
  numOfCols,
  handleToggleFavorites,
  isFavorite,
}: CellProps) {
  const movieIndex = rowIndex * numOfCols + columnIndex;
  const cellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const index = rowIndex * numOfCols + columnIndex;

    if (index === active && showActive && cellRef.current) {
      cellRef.current.scrollIntoView();
    }
  }, [columnIndex, rowIndex, active, showActive, numOfCols]);

  if (!movie) return null;

  return (
    <div
      ref={cellRef}
      style={{
        ...style,
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        display: 'flex',
        justifyContent: 'center',
      }}
      className={`relative overflow-hidden card${
        movieIndex === active && showActive ? ' active' : ''
      }`}
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
        <Button active={isFavorite} />
      </div>
    </div>
  );
}
