export const fetchProperties = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters, // Spread filters into query
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties?${queryParams}`,
    {
      cache: "no-store", // Ensure fresh data every request
    }
  );

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

export const searchProperties = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters, // Spread filters into query
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties/search?${queryParams}`,
    {
      cache: "no-store", // Ensure fresh data every request
    }
  );

  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};
