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
  "javascript": { species: "pino" },
  "typescript": { species: "pino" },
  "nodejs":     { species: "pino" },
  "python":     { species: "pino" },
  "html":       { species: "frondoso" },
  "css":        { species: "frondoso" }
};
