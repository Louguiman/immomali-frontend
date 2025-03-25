export const getValidParams = (searchParams) => {
  console.log("params to validate: ", searchParams);

  return Object.fromEntries(
    [...searchParams.entries()].filter(([_, value]) => value.trim() !== "")
  );
};

export function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}
