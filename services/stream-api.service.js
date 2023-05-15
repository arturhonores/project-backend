const axios = require('axios');

class MoviesApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://streaming-availability.p.rapidapi.com/v2',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        });
        this.cursor = '';
        this.previousCursors = [];
    }

    getMovies(req, res, next) {
        console.log("Valor actual del cursor:", this.cursor);
        const options = {
            method: 'GET',
            url: '/search/pro',
            params: {
                country: 'us',
                services: 'prime.subscription',
                output_language: 'en',
                genres: '80',
                show_type: 'movie',
                genres_relation: 'or',
                show_original_language: 'en',
                year_min: '2022',
                year_max: '2025',
                order_by: 'year',
                desc: 'true',
                cursor: this.cursor
            }
        };

        this.axiosApp
            .request(options)
            .then(response => {
                const movieData = response.data;
                res.render('api/new-movie', {
                    movie: movieData,
                });
                console.log(response.data);
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = MoviesApiHandler;
