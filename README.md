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

- domain/ : couche métier de la compagnie comportant juste des interfaces sans implémentation logique : ne résout aucun problème et donc peut être deplacé sur un autre projet
- domain/entities : contient les entités de l'application définissant juste les données de base
- domain/dtos : contient les Data Transfert Object permettant de transferer d'une couche à l'autre
- domain/errors : contient les interfaces d'erreurs avec la gestion d'exception
- domain/interfaces : contient toute les interfaces propre aux repositories et uses cases
- domain/enum : contient toute les enums utiles pour les autres couches
- application/ : couche metier de l'application faisant reference au domaine
- application/use-cases : couche applicative implementant leur interfaces respectives avec toute la logique(qui fait reference aux repos)
- infrastructure/ : couche de gestion des données permettant une abstraction de leur fonctionnement(avoir plusieurs sources de données sans que les autres couches le sachent)
- infrastructure/interfaces/data-sources : abstraction de la provenance d'une donnée
- infrastructure/interfaces/repositories : liaison entre une source de donnée et l'utilisateur permettant une interaction avec celle ci
- infrastructure/providers : implementations des différentes source de données(ici que mongo)
- presentation : couche express regroupant les routes de l'api et les middlewares faisant reference à toute les couches

[<img src="https://cdn-media-1.freecodecamp.org/images/YsN6twE3-4Q4OYpgxoModmx29I8zthQ3f0OR">](https://cdn-media-1.freecodecamp.org/images/YsN6twE3-4Q4OYpgxoModmx29I8zthQ3f0OR)
