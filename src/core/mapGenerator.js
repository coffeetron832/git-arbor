// src/core/mapGenerator.js
import { TREE_SPECIES, LANGUAGE_MAP } from '../assets/templates.js';

const MAP_COLS = 220; // Ancho total del mapa de texto
const MAP_ROWS = 28;  // Alto total (líneas verticales)

export function generateAsciiMap(processedRepos) {
  // Inicializar lienzo bidimensional con espacios en blanco
  let lienzo = Array(MAP_ROWS).fill(null).map(() => Array(MAP_COLS).fill(" "));
  const posicionesOcupadas = [];

  processedRepos.forEach((repo) => {
    const mapping = LANGUAGE_MAP[repo.language] || { species: 'pino' };
    const matrix = TREE_SPECIES[mapping.species][`stage${repo.stage}`];
    
    const treeWidth = matrix[0].length;
    const treeHeight = matrix.length;

    let posX = 0, posY = 0;
    let intento = 0;
    let posicionValida = false;

    // Algoritmo de dispersión sin colisiones
    while (!posicionValida && intento < 80) {
      posX = Math.floor(Math.random() * (MAP_COLS - treeWidth - 12)) + 6;
      posY = Math.floor(Math.random() * (MAP_ROWS - treeHeight - 5)) + 2;

      posicionValida = !posicionesOcupadas.some(pos => {
        return (posX < pos.x + pos.w + 6 && posX + treeWidth + 6 > pos.x &&
                posY < pos.y + pos.h + 3 && posY + treeHeight + 3 > pos.y);
      });
      intento++;
    }

    // Si la posición es apta, procedemos a estampar los caracteres en la matriz matriz
    if (posicionValida) {
      posicionesOcupadas.push({ x: posX, y: posY, w: treeWidth, h: treeHeight });

      // Estampar la copa y el tronco del árbol
      matrix.forEach((linea, filaIndex) => {
        for (let colIndex = 0; colIndex < linea.length; colIndex++) {
          lienzo[posY + filaIndex][posX + colIndex] = linea[colIndex];
        }
      });

      // Estampar el nombre identificador del repositorio debajo
      const nombreTruncado = repo.name.substring(0, treeWidth + 4);
      const centroX = posX + Math.floor((treeWidth - nombreTruncado.length) / 2);
      
      for (let i = 0; i < nombreTruncado.length; i++) {
        if (centroX + i < MAP_COLS && centroX + i >= 0) {
          lienzo[posY + treeHeight][centroX + i] = nombreTruncado[i];
        }
      }
    }
  });

  // Unificar las filas para retornar el bloque de texto Markdown final
  return lienzo.map(fila => fila.join("")).join("\n");
}
