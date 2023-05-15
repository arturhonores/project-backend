const router = require("express").Router();
const axios = require('axios');

let cursor = ''; // Variable para almacenar el valor del cursor

const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/v2/search/pro',
    params: {
        country: 'es',
        services: 'prime.subscription',
        output_language: 'en',
        show_type: 'movie',
        // genres: '4',
        genres_relation: 'or',
        // keyword: 'zombie',
        show_original_language: 'en',
        year_min: '2022',
        year_max: '2025',
        order_by: 'year',
        desc: 'true',
        cursor: cursor // Incluir el valor del cursor en los parámetros
    },
    headers: {
        'X-RapidAPI-Key': '008a72a717msh3f3f676623b2669p142376jsnb704aca49cf5',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};

router.get("/peliculas-new", (req, res, next) => {
    console.log("Valor actual del cursor:", cursor);
    axios.request(options)
        .then(response => {
            const movieData = response.data;
            const hasMore = movieData.hasMore;
            const nextCursor = movieData.nextCursor;
            const escapedNextCursor = encodeURIComponent(nextCursor);

            res.render("api/new-movie", {
                movie: movieData,
                hasMore: hasMore,
                nextCursor: escapedNextCursor
            });
            console.log(response.data);
            if (hasMore) {
                cursor = nextCursor; // Obtener el valor del cursor para la siguiente solicitud
                options.params.cursor = cursor; // Actualizar el valor del cursor en los parámetros
                // Realizar una nueva solicitud con el nuevo cursor
                axios.request(options)
                    .then(response => {
                        // Realizar las operaciones necesarias con la respuesta adicional
                    })
                    .catch(err => {
                        next(err);
                    });
            }
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;
