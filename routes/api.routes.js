const router = require("express").Router();
const axios = require("axios");

// let nextCursor = null;

// const options = {
//     method: 'GET',
//     url: 'https://streaming-availability.p.rapidapi.com/v2/search/pro',
//     params: {
//         country: 'us',
//         services: 'netflix',
//         output_language: 'en',
//         show_type: 'movie',
//         // genres: '18,80',
//         genres_relation: 'or',
//         // keyword: 'zombie',
//         show_original_language: 'en',
//         year_min: '2021',
//         year_max: '2025',
//         order_by: 'year',
//         desc: 'true'
//     },
//     headers: {
//         'X-RapidAPI-Key': '008a72a717msh3f3f676623b2669p142376jsnb704aca49cf5',
//         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//     }
// };

// function fetchMovies(req, res, next) {
//     if (nextCursor) {
//         // Si hay un valor de cursor almacenado, se agrega a los parámetros de la solicitud
//         options.params.cursor = nextCursor;
//     }

//     axios
//         .request(options)
//         .then(response => {
//             res.render("api/new-movie", { movie: response.data });
//             console.log(response.data);

//             if (response.data.hasMore && nextCursor !== response.data.nextCursor) {
//                 // Si la respuesta indica que hay más resultados disponibles y el cursor es diferente, se almacena el valor del cursor
//                 nextCursor = response.data.nextCursor;
//                 // Se realiza la siguiente solicitud
//                 fetchMovies(req, res, next);
//             } else {
//                 // Si no hay más resultados, se reinicia el valor del cursor a null
//                 nextCursor = null;
//                 next();
//             }
//         })
//         .catch(err => {
//             next(err);
//         });
// }

// router.get("/peliculas-new", fetchMovies, (req, res, next) => {
//     // Aquí puedes realizar cualquier acción adicional después de que se hayan obtenido todas las películas
//     next();
// });

module.exports = router;
