// src/core/mapGenerator.js
import { TREE_SPECIES, LANGUAGE_MAP } from '../assets/templates.js';

const MAP_COLS = 100; 
const MAP_ROWS = 28;  

export function generateAsciiMap(processedRepos) {
  // Inicializamos un lienzo de objetos estructurados
  let lienzo = Array(MAP_ROWS).fill(null).map(() => 
    Array(MAP_COLS).fill(null).map(() => ({ char: " ", color: null }))
  );
  
  const posicionesOcupadas = [];

  processedRepos.forEach((repo) => {
    const mapping = LANGUAGE_MAP[repo.language] || LANGUAGE_MAP["unknown"] || { species: 'pino', color: '#E2E8F0' };
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

      // Estampar árbol con su color pastel real
      matrix.forEach((linea, filaIndex) => {
        for (let colIndex = 0; colIndex < linea.length; colIndex++) {
          const char = linea[colIndex];
          if (char !== " ") {
            lienzo[posY + filaIndex][posX + colIndex] = { char, color: mapping.color };
          }
        }
      });

      // Estampar nombre del repositorio (en gris plano)
      const nombreTruncado = repo.name.substring(0, treeWidth + 2);
      const centroX = posX + Math.floor((treeWidth - nombreTruncado.length) / 2);
      
      for (let i = 0; i < nombreTruncado.length; i++) {
        if (centroX + i < MAP_COLS && centroX + i >= 0) {
          lienzo[posY + treeHeight][centroX + i] = { char: nombreTruncado[i], color: "#71717a" };
        }
      }
    }
  });

  // Convertimos el lienzo en líneas de texto con etiquetas <tspan> para el SVG
  let svgRows = "";
  const yStart = 25; // Punto de inicio vertical
  const lineSpacing = 13; // Interlineado para fuente monospace

  for (let r = 0; r < MAP_ROWS; r++) {
    let rowContent = "";
    let colorActual = null;

    for (let c = 0; c < MAP_COLS; c++) {
      const celda = lienzo[r][c];

      // Reemplazamos los espacios vacíos por espacios HTML para mantener la cuadrícula simétrica
      const charToRender = celda.char === " " ? "&#160;" : celda.char;

      if (celda.color !== colorActual) {
        if (colorActual) rowContent += "</tspan>";
        if (celda.color) rowContent += `<tspan fill="${celda.color}">`;
        colorActual = celda.color;
      }
      rowContent += charToRender;
    }
    if (colorActual) rowContent += "</tspan>";

    // Añadimos la fila de texto al bloque SVG
    svgRows += `  <text x="15" y="${yStart + (r * lineSpacing)}" font-family="monospace" font-size="11px" fill="#71717a" xml:space="preserve">${rowContent}</text>\n`;
  }

  // Retornamos el contenedor SVG completo (simulando una caja de terminal con fondo oscuro)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400">
<style>
  text { font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace; }
</style>
<rect width="100%" height="100%" rx="8" fill="#16161a" stroke="#2a2a2e" stroke-width="1"/>
${svgRows}
</svg>`;
}