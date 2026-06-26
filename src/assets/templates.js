// src/assets/templates.js

export const TREE_SPECIES = {
  // Especie Backend (Pino/Triangular)
  pino: {
    stage1: [
      "         ", "         ", "         ", "         ",
      "    ▄    ", "    █    ", "    █    ", "    █    "
    ],
    stage2: [
      "         ", "         ", "         ", "    ▄    ",
      "   ███   ", "    █    ", "    █    ", "    █    "
    ],
    stage3: [
      "         ", "         ", "    ▄    ", "   ███   ",
      "   ███   ", "    █    ", "    █    ", "    █    "
    ],
    stage4: [
      "         ", "    ▄    ", "   ███   ", "  █████  ",
      "   ███   ", "    █    ", "    █    ", "    █    "
    ],
    stage5: [
      "    ▄    ", "   ███   ", "  █████  ", " ███████ ",
      "   ███   ", "   ███   ", "   ███   ", "   ███   "
    ],
    stage6: [
      "    ▄    ", "   ███   ", "  █████  ", " ███████ ",
      "█████████", "  █████  ", "   ███   ", "   ███   "
    ]
  },
  // Especie Frontend (Frondoso/Redondeado)
  frondoso: {
    stage1: [
      "         ", "         ", "         ", "         ",
      "   ▄▄▄   ", "    █    ", "    █    ", "    █    "
    ],
    stage2: [
      "         ", "         ", "         ", "   ▄▄▄   ",
      "  ▄███▄  ", "    █    ", "    █    ", "    █    "
    ],
    stage3: [
      "         ", "         ", "  ▄███▄  ", " ▄█████▄ ",
      "   ███   ", "    █    ", "    █    ", "    █    "
    ],
    stage4: [
      "         ", "  ▄███▄  ", " ▄█████▄ ", "█████████",
      "  █████  ", "    █    ", "    █    ", "    █    "
    ],
    stage5: [
      "  ▄███▄  ", " ▄█████▄ ", "█████████", "█████████",
      " ███████  ", "   ███   ", "   ███   ", "   ███   "
    ],
    stage6: [
      "  ▄███▄  ", " ▄█████▄ ", "█████████", "█████████",
      " ███████ ", "  █████  ", "   ███   ", "   ███   "
    ]
  }
};

export const LANGUAGE_MAP = {
  "javascript": { species: "pino", color: "#B4E197" }, // Verde pastel
  "typescript": { species: "pino", color: "#A8DADC" }, // Azul/Cian pastel
  "nodejs":     { species: "pino", color: "#B4E197" },
  "python":     { species: "pino", color: "#A8DADC" },
  "html":       { species: "frondoso", color: "#F4A261" }, // Naranja pastel
  "css":        { species: "frondoso", color: "#FFB7B2" }, // Rosa pastel
  "unknown":    { species: "pino", color: "#E2E8F0" }  // Blanco grisáceo para otros
};
