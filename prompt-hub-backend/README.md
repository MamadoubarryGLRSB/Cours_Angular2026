# Prompt Hub — Backend

API REST NestJS de **Prompt Hub** : prompts, catégories, votes et authentification.

- **Port** : 3000
- **Documentation Swagger** : `http://localhost:3000/api`
- **Données** : fichier JSON local (`data/db.json`)
- **Auth** : JWT stocké dans un cookie http-only

## Endpoints

| Méthode | Route | Rôle |
|---------|-------|------|
| `GET` | `/prompts`, `/prompts/:id` | Lister / lire les prompts |
| `POST` `PUT` `DELETE` | `/prompts`, `/prompts/:id` | Créer / modifier / supprimer |
| `POST` | `/prompts/:id/upvote`, `/prompts/:id/downvote` | Voter |
| `GET` | `/categories` | Lister les catégories |
| `POST` | `/auth/register`, `/auth/login`, `/auth/logout` | Authentification |
| `GET` | `/auth/me` | Utilisateur connecté |

## Lancer le projet

```bash
npm install
npm run start:dev        # sans auth : tout est fait au nom de l'utilisateur « Système »
npm run start:auth:dev   # avec auth : JWT requis pour créer, modifier, voter
```

Le frontend [`prompt-hub-frontend`](../prompt-hub-frontend) (port 4200) consomme cette API.

---

Projet d'apprentissage, réalisé en suivant [cette formation Angular](https://youtu.be/3llJm3LO1e4).
