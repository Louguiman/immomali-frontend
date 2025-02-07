export const splitDescription = (description, minWordsPerSegment = 150) => {
  if (!description) return [];

  // Split into sentences while keeping punctuation
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];

  const result = [];
  let currentParagraph = [];

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
