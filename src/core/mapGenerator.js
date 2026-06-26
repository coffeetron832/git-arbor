// src/core/mapGenerator.js
import { TREE_SPECIES, LANGUAGE_MAP } from '../assets/templates.js';

const MAP_COLS = 100; // Un poco más compacto para evitar scrolls
const MAP_ROWS = 28;  

export function generateAsciiMap(processedRepos) {
  // Inicializamos un lienzo de caracteres simple (texto plano puro)
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

    while (!posicionValida && intento < 100) {
      posX = Math.floor(Math.random() * (MAP_COLS - treeWidth - 6)) + 3;
      posY = Math.floor(Math.random() * (MAP_ROWS - treeHeight - 4)) + 2;

      posicionValida = !posicionesOcupadas.some(pos => {
        return (posX < pos.x + pos.w + 5 && posX + treeWidth + 5 > pos.x &&
                posY < pos.y + pos.h + 2 && posY + treeHeight + 2 > pos.y);
      });
      intento++;
    }

    if (posicionValida) {
      posicionesOcupadas.push({ x: posX, y: posY, w: treeWidth, h: treeHeight });

      // Estampar el árbol
      matrix.forEach((linea, filaIndex) => {
        for (let colIndex = 0; colIndex < linea.length; colIndex++) {
          const char = linea[colIndex];
          if (char !== " ") {
            // Truco: Si es desarrollo Frontend usamos un carácter alternativo o dejamos el bloque
            lienzo[posY + filaIndex][posX + colIndex] = char;
          }
        }
      });

      // Estampar nombre del repositorio
      const nombreTruncado = repo.name.substring(0, treeWidth + 2);
      const centroX = posX + Math.floor((treeWidth - nombreTruncado.length) / 2);
      
      for (let i = 0; i < nombreTruncado.length; i++) {
        if (centroX + i < MAP_COLS && centroX + i >= 0) {
          lienzo[posY + treeHeight][centroX + i] = nombreTruncado[i];
        }
      }
    }
  });

  // Unimos el lienzo en líneas de texto plano limpio
  return lienzo.map(fila => fila.join("")).join("\n");
}