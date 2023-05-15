# PROJECT BACKEND

Es una aplicación web que te permite saber que películas y series están disponibles en las principales plataformas de streaming. Podrás seleccionar entre películas o series más populares, nuevas, mejor puntuadas, etc.

---

## Instalación

Sólo es necesario contar con un servidor web con Node.js

---

## Uso

### Routes

#### 1. Authenticated Routs

| HTTP Method | URL Path          | Description          | JSON |
| ----------- | ----------------- | -------------------- | ---- |
| GET         | `/`               | Index page           |      |
| GET         | `/registro`       | Sign Up form render  |      |
| POST        | `/registro`       | Sign Up form handler |      |
| GET         | `/iniciar-sesion` | Login form render    |      |
| POST        | `/iniciar-sesio`n | Login form handler   |      |
| GET         | ` /desconectar/`  | Logout               |      |

#### 2. User Routs

| HTTP Method | URL Path                          | Description                   | JSON |
| ----------- | --------------------------------- | ----------------------------- | ---- |
| GET         | `/perfil`                         | profile                       |      |
| GET         | `/perfil/editar/:id`              | profile edit                  |      |
| POST        | `/perfil/editar/:id`              | profile edit form handler     |      |
| POST        | `/perfil/eliminar/:id`            | profile delete                |      |
| GET         | `/usuario/crear/watchlist`        | New watchlist                 |      |
| POST        | `/usuario/crear/watchlist/:id`    | New watchlist form handler    |      |
| GET         | `/usuario/editar/watchlist/:id`   | watchlist edit                |      |
| POST        | `/usuario/editar/watchlist/:id`   | watchlist edit form handler   |      |
| POST        | `/usuario/eliminar/watchlist/:id` | watchlist delete form handler |      |

#### 2. API Routs

| HTTP Method | URL Path        | Description    | JSON |
| ----------- | --------------- | -------------- | ---- |
| GET         | `/movies`       | Movie List     | ✅    |
| GET         | `/movies/:id`   | Movie details  | ✅    |
| POST        | `filter/movies` | Filter movies  | ✅    |
| GET         | `/series`       | Series List    | ✅    |
| GET         | ` /series/:id`  | Series details | ✅    |
| POST        | `filter/series` | Filter series  | ✅    |

#### 3. Events Routs

| HTTP Method | URL Path                | Description                | JSON |
| ----------- | ----------------------- | -------------------------- | ---- |
| GET         | `/eventos/crear`        | New event                  |      |
| POST        | `/eventos/crear`        | New event form handler     |      |
| GET         | `/eventos/lista`        | Events list                |      |
| GET         | `/eventos/detalles/:id` | Events details             |      |
| GET         | `/eventos/editar/:id`   | Events edit                |      |
| POST        | `/eventos/editar/:id`   | Events edit form handler   |      |
| POST        | `/eventos/eliminar/:id` | Events delete form handler |      |

---

## Technologies

| Dependencies  | version |
| ------------- | ------- |
| cookie-parser | 1.4.6   |
| dotenv        | 16.0.3  |
| express       | 4.18.2  |
| hbs           | 4.2.0   |
| mongoose      | 7.1.1   |
| morgan        | 1.10.0  |
| serve-favicon | 2.5.0   |
| nodemon       | 2.0.22  |
| axios         | 1.4.0   |

---

## License

The source code for the site is licensed under the MIT license
