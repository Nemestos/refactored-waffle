# Refactored Waffle

Basic motos crud API

## Installation

```bash
docker-compose build
```

## Usage

```bash
docker-compose up


# Structure API
- domain/ : couche métier comportant juste des interfaces sans implémentation logique : ne résout aucun problème et donc peut être deplacé sur un autre projet
- domain/entities : contient les entités de l'application définissant juste les données de base
- domain/dtos : contient les Data Transfert Object permettant de transferer d'une couche à l'autre
- domain/errors : contient les interfaces d'erreurs avec la gestion d'exception
- domain/interfaces : contient toute les interfaces propre aux repositories et uses cases
- domain/use-cases : couche applicative avec toute la logique

- presentation : couche express regroupant les routes de l'api et les middlewares


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
```
