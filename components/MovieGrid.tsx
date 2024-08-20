'use client';

import { IMovie, IMovieResponse } from '@/types/movies';
import { useCallback, useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import MovieCell from './MovieCell';
import { toggleNumberInArray } from '@/utils.ts';

interface MovieGridProps {
  data: IMovieResponse;
}

export default function MovieGrid({ data }: MovieGridProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState({
    width: 0,
    height: 0,
    itemSize: 0,
    numOfCols: 1,
  });

  const [active, setActive] = useState<number>(0);
  const [showActive, setShowActive] = useState(false);

  const handleNavigation = (direction: 'left' | 'right') => {
    setActive((prevActive) => {
      if (direction === 'left') {
        return Math.max(prevActive - 1, 0);
      } else if (direction === 'right') {
        return prevActive + 1;
      }
      return prevActive;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setShowActive(true);
      if (event.key === 'ArrowLeft') {
        handleNavigation('left');
      } else if (event.key === 'ArrowRight') {
        handleNavigation('right');
      } else if (event.key === 'Enter') {
        handleToggleFavorites(data.movies[active]);
      }

      document.body.style.cursor = 'none';
    };

    const handleMouseMove = () => {
      document.body.style.cursor = 'auto';
      setShowActive(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [active, data.movies]);

  const updateGridSize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numOfCols = width < 500 ? 1 : width < 900 ? 3 : 6;
    const itemSize = Math.min(width / numOfCols);
    setGridSize({ width, height, itemSize, numOfCols });
  }, []);

  useEffect(() => {
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, [updateGridSize]);

  const { width, height, itemSize, numOfCols } = gridSize;

  const handleToggleFavorites = (movie: IMovie) => {
    setFavorites((prev) => toggleNumberInArray(prev, movie.id));
  };

  return (
    <Grid
      columnCount={numOfCols}
      columnWidth={itemSize}
      height={height}
      rowCount={Math.ceil(data.movies.length / numOfCols)}
      rowHeight={itemSize + 150}
      width={width}
      className={showActive ? '' : 'hasHover'}
    >
      {({ columnIndex, rowIndex, style }) => {
        const movieIndex = rowIndex * numOfCols + columnIndex;
        const movie = data.movies[movieIndex];
        return (
          <MovieCell
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            style={style}
            movie={movie}
            active={active}
            showActive={showActive}
            numOfCols={numOfCols}
            handleToggleFavorites={handleToggleFavorites}
            isFavorite={favorites.includes(movie.id)}
          />
        );
      }}
    </Grid>
  );
}
