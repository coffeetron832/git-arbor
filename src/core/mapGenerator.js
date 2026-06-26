// src/core/mapGenerator.js
import { TREE_SPECIES, LANGUAGE_MAP } from '../assets/templates.js';

// Medidas optimizadas para evitar scroll excesivo y verse compacto
const MAP_COLS = 110; 
const MAP_ROWS = 32;  

export function generateAsciiMap(processedRepos) {
  // Inicializamos el lienzo. Cada celda es un objeto con el carácter y su color
  let lienzo = Array(MAP_ROWS).fill(null).map(() => 
    Array(MAP_COLS).fill(null).map(() => ({ char: " ", color: null }))
  );
  
  const posicionesOcupadas = [];

  processedRepos.forEach((repo) => {
    const mapping = LANGUAGE_MAP[repo.language] || LANGUAGE_MAP["unknown"];
    const matrix = TREE_SPECIES[mapping.species][`stage${repo.stage}`];
    
    const treeWidth = matrix[0].length;
    const treeHeight = matrix.length;

    let posX = 0, posY = 0;
    let intento = 0;
    let posicionValida = false;

    // Buscamos coordenadas en el nuevo espacio reducido
    while (!posicionValida && intento < 100) {
      posX = Math.floor(Math.random() * (MAP_COLS - treeWidth - 8)) + 4;
      posY = Math.floor(Math.random() * (MAP_ROWS - treeHeight - 4)) + 2;

      // Margen de colisión ligeramente más ajustado para el nuevo espacio
      posicionValida = !posicionesOcupadas.some(pos => {
        return (posX < pos.x + pos.w + 4 && posX + treeWidth + 4 > pos.x &&
                posY < pos.y + pos.h + 2 && posY + treeHeight + 2 > pos.y);
      });
      intento++;
    }

    if (posicionValida) {
      posicionesOcupadas.push({ x: posX, y: posY, w: treeWidth, h: treeHeight });

      // Dibujar las hojas y tronco con su respectivo color
      matrix.forEach((linea, filaIndex) => {
        for (let colIndex = 0; colIndex < linea.length; colIndex++) {
          const char = linea[colIndex];
          if (char !== " ") { // Solo pintamos donde hay bloques
            lienzo[posY + filaIndex][posX + colIndex] = { char, color: mapping.color };
          }
        }
      });

      // Dibujar el nombre del repo debajo (en color gris oscuro para no saturar)
      const nombreTruncado = repo.name.substring(0, treeWidth + 2);
      const centroX = posX + Math.floor((treeWidth - nombreTruncado.length) / 2);
      
      for (let i = 0; i < nombreTruncado.length; i++) {
        if (centroX + i < MAP_COLS && centroX + i >= 0) {
          lienzo[posY + treeHeight][centroX + i] = { char: nombreTruncado[i], color: "#71717A" };
        }
      }
    }
  });

  // Convertimos la matriz estructurada a HTML coloreado línea por línea
  let htmlFinal = "";
  
  for (let r = 0; r < MAP_ROWS; r++) {
    let filaHtml = "";
    let colorActual = null;

    for (let c = 0; c < MAP_COLS; c++) {
      const celda = lienzo[r][c];

      if (celda.color !== colorActual) {
        if (colorActual) filaHtml += "</font>"; // Cerramos color anterior
        if (celda.color) filaHtml += `<font color="${celda.color}">`; // Abrimos nuevo color
        colorActual = celda.color;
      }
      
      filaHtml += celda.char;
    }
    if (colorActual) filaHtml += "</font>";
    htmlFinal += filaHtml + "\n";
  }

  return htmlFinal;
}
