export const splitDescription = (
  description: string | undefined | null,
  minWordsPerSegment: number = 150
): string[] => {
  if (!description) return [];

  // Split into sentences while keeping punctuation
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];

  const result: string[] = [];
  let currentParagraph: string[] = [];

  for (const sentence of sentences) {
    currentParagraph.push(sentence.trim());

    // If paragraph reaches min words, push it as a segment
    if (currentParagraph.join(" ").split(" ").length >= minWordsPerSegment) {
      result.push(currentParagraph.join(" "));
      currentParagraph = [];
    }
  }

  // Add remaining sentences as last paragraph
  if (currentParagraph.length) {
    result.push(currentParagraph.join(" "));
  }

  return result;
};

export function cleanUrl(url: string | undefined | null): string {
  if (!url) return "";

  try {
    // Remove extra slashes but preserve the 'https://' part
    return url.replace(/([^:]\/)\/+/g, "$1");
  } catch (error) {
    console.log("Error cleaning URL:", error);
    return url; // Return original if error occurs
  }
}
