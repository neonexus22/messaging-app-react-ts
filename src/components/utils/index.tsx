export const arrayEquality = (
  a: (string | number)[],
  b: (string | number)[],
): boolean => {
  if (a?.length !== b?.length) return false
  a?.sort()
  b?.sort()
  return a.every((el, index: number) => el === b[index])
}
