# Prompt Hub — Frontend

Application Angular de partage et de vote de prompts IA : liste des prompts, catégories, copie en un clic, votes, création et édition.

## Stack

- **Angular 21** : standalone components, signals, nouveau control flow (`@for`, `@if`)
- **PrimeNG** (thème Aura, couleur primaire indigo) + PrimeFlex + PrimeIcons
- **Mode sombre** avec mémorisation du choix
- Communique avec l'API REST NestJS de [`prompt-hub-backend`](../prompt-hub-backend)

## Structure

```
src/app/
├── app.config.ts          # providers : router, thème PrimeNG
└── prompts/
    ├── navbar/            # barre de navigation + toggle dark mode
    ├── prompt-list/       # liste des prompts + modèles (Prompt, Category)
    └── prompt-card/       # carte d'un prompt (copie, votes)
```

## Lancer le projet

```bash
npm install
npm start
```

Ouvre `http://localhost:4200`. Le backend doit tourner sur le port 3000.

---

Projet d'apprentissage, réalisé en suivant [cette formation Angular](https://youtu.be/3llJm3LO1e4).
