export const useGetMapEveryNthElement = <T>(
  array?: T[],
  nthElement: number = 8,
) => {
  return array?.filter((_, index) => index % nthElement === 0);
};
