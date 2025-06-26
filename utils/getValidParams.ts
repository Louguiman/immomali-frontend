export const getValidParams = (searchParams: URLSearchParams): Record<string, string> => {
  console.log("params to validate: ", searchParams);

  return Object.fromEntries(
    [...searchParams.entries()].filter(([_, value]) => value.trim() !== "")
  );
};

export function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  ) as Partial<T>;
}
