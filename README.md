# Refactored Waffle

Basic motos crud API

## Installation

```bash
docker-compose build
```

## Usage

- Setting env variable in `.env` with `.env.default` template

- ```bash
  docker-compose up
  ```

## Structure API

- domain/ : couche métier comportant juste des interfaces sans implémentation logique : ne résout aucun problème et donc peut être deplacé sur un autre projet
- domain/entities : contient les entités de l'application définissant juste les données de base
- domain/dtos : contient les Data Transfert Object permettant de transferer d'une couche à l'autre
- domain/errors : contient les interfaces d'erreurs avec la gestion d'exception
- domain/interfaces : contient toute les interfaces propre aux repositories et uses cases
- domain/use-cases : couche applicative avec toute la logique

- presentation : couche express regroupant les routes de l'api et les middlewares
