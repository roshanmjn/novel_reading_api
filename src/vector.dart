function cosineSimilarity(vectorA, vectorB) {
  const dotProduct = vectorA.reduce((acc, val, index) => acc + val * vectorB[index], 0);
  const normA = Math.sqrt(vectorA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vectorB.reduce((acc, val) => acc + val * val, 0));
  
  return dotProduct / (normA * normB);
}

// Example genre vectors (representing genre preferences of a user and two movies)
const userPreferences = [0.7, 0.2, 0.9, 0, 0.5];
const movie1Genres = [0.8, 0.1, 0.7, 0, 0.3];
const movie2Genres = [0.2, 0.9, 0.1, 0.6, 0.4];

const similarity1 = cosineSimilarity(userPreferences, movie1Genres);
const similarity2 = cosineSimilarity(userPreferences, movie2Genres);

console.log("Cosine Similarity with Movie 1:", similarity1);
console.log("Cosine Similarity with Movie 2:", similarity2);
