// src/api/github.js
import axios from 'axios';

export async function fetchGitHubRepos(username) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&type=public`, 
      { headers }
    );
    
    return response.data.map(repo => ({
      name: repo.name,
      language: repo.language ? repo.language.toLowerCase() : 'unknown',
      size: repo.size, // Tamaño en KB
      stars: repo.stargazers_count
    }));
  } catch (error) {
    throw new Error(`Error al consultar la API de GitHub: ${error.message}`);
  }
}
