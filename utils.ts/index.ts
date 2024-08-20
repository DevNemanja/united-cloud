export const getImageUrl = (poster_path: string) => {
  return 'https://image.tmdb.org/t/p/w500' + poster_path;
};

export function toggleNumberInArray(array: number[], num: number): number[] {
  const arr = [...array];
  const index = arr.indexOf(num);

  if (index > -1) {
    arr.splice(index, 1);
  } else {
    arr.push(num);
  }

  return arr;
}
