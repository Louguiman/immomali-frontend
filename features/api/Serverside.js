export const fetchProperties = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters, // Spread filters into query
  }).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties?${queryParams}`,
      {
        cache: "no-store", // Ensure fresh data every request
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch properties:", error);
    // Return an empty list or fallback data instead of crashing
    return [];
  }
};

export const searchProperties = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters, // Spread filters into query
  }).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/search?${queryParams}`,
      {
        cache: "no-store", // Ensure fresh data every request
      }
    );

    if (!res.ok) throw new Error("Failed to fetch properties");
    return res.json();
  } catch (error) {
    console.warn("Failed to fetch properties:", error);
    // Return an empty list or fallback data instead of crashing
    return [];
  }
};

// utils/getSignedUrl.js
export async function getSignedUrl(imageUrl) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/signed-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch signed URL");
    }

    const data = await response.json();
    console.log("request sign url: ", data);

    // Assuming your endpoint returns an object like: { signedUrl: "..." }
    return data;
  } catch (error) {
    console.warn("Failed to fetch properties:", error);
    // Return an empty list or fallback data instead of crashing
    return [];
  }
}
