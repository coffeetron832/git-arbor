// src/core/growth.js

/**
 * Calcula la etapa de crecimiento de un árbol (del 1 al 6)
 * basándose en el tamaño del repositorio y sus estrellas.
 */
export function calculateTreeStage(repo) {
  let score = 0;

  // Crecimiento logarítmico basado en el tamaño para mitigar saltos bruscos
  if (repo.size > 0) {
    score += Math.log2(repo.size) * 3;
  }

  // Las estrellas dan un impulso de peso al crecimiento del ecosistema
  score += repo.stars * 8;

  // Clasificación en los 6 umbrales fluidos del contenedor estándar
  if (score < 12)  return 1; // Brote
  if (score < 24)  return 2;
  if (score < 40)  return 3;
  if (score < 60)  return 4;
  if (score < 85)  return 5;
  return 6;                  // Árbol en su máximo esplendor (maduro)
}
