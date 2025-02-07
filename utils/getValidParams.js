export const getValidParams = (searchParams) => {
  return Object.fromEntries(
    [...searchParams.entries()].filter(([_, value]) => value.trim() !== "")
  );
};
