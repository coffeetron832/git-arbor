// src/index.js
import fs from 'fs';
import { fetchGitHubRepos } from './api/github.js';
import { calculateTreeStage } from './core/growth.js';
import { generateAsciiMap } from './core/mapGenerator.js';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_USER = "coffeetron832"; // Reemplaza por tu usuario de GitHub en producción

async function init() {
  console.log(`\x1b[32m🌲 Inicializando git-arbor para: ${GITHUB_USER}...\x1b[0m`);
  
  try {
    const repos = await fetchGitHubRepos(GITHUB_USER);
    console.log(`📡 Datos recuperados de la API. Procesando ${repos.length} repositorios públicos...`);

    const processed = repos.map(repo => ({
      ...repo,
      stage: calculateTreeStage(repo)
    }));

    // Cambiamos el nombre de la variable y del archivo de salida
    const mapaAscii = generateAsciiMap(processed);
    
    fs.writeFileSync('bosque_profile.txt', mapaAscii);
    
    console.log("\n\x1b[34m💾 ¡Mapa generado con éxito en 'bosque_profile.html'!\x1b[0m");
    console.log("Copia su contenido y colócalo en tu Profile README.");
  } catch (error) {
    console.error("\x1b[31m❌ Error en la ejecución del core:\x1b[0m", error.message);
  }
}

init();
