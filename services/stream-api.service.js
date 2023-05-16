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
        this.previousCursors = [];
    }

    createQueryParams(cursor, country, services) {
        return {
            country: country || 'es',
            services: services || 'netflix,prime.subscription,disney,hbo',
            output_language: 'en',
            genres: '1, 2, 3, 4, 5, 6, 7, 12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749, 10751, 10752, 10763, 10764, 10767',            show_type: 'movie',
            genres_relation: 'or',
            show_original_language: 'en',
            year_min: '2022',
            year_max: '2025',
            order_by: 'year',
            desc: 'true',
            cursor: cursor
        };
    }

    updatePreviousCursors(cursor) {
        if (cursor) {
            const index = this.previousCursors.indexOf(cursor);
            if (index !== -1) {
                this.previousCursors = this.previousCursors.slice(0, index);
            } else {
                this.previousCursors.push(cursor);
            }
        }
    }

    async getMovies(req, res, next) {
        const cursor = req.query.cursor || '';

        this.updatePreviousCursors(cursor);

        console.log("Valor actual del cursor:", cursor);

        try {
            const options = {
                method: 'GET',
                url: '/search/pro',
                params: this.createQueryParams(cursor)
            };

            const response = await this.axiosApp.request(options);
            const movieData = response.data;

            res.render('api/new-movie', {
                movie: movieData,
                hasPrevious: this.previousCursors.length > 1,
                previousCursor: this.previousCursors[this.previousCursors.length - 2],
                hasMore: movieData.hasMore,
                nextCursor: movieData.nextCursor
            });

            console.log(response.data);
        } catch (err) {
            next(err);
        }
    }

    async getFilteredMovies(req, res, next) {
        const { country, services } = req.body;

        try {
            const options = {
                method: 'GET',
                url: '/search/pro',
                params: this.createQueryParams(undefined, country, services)
            };

            const response = await this.axiosApp.request(options);
            const movieData = response.data;

            res.render('api/movie-filter', {
                movie: movieData,
                hasPrevious: this.previousCursors.length > 1,
                previousCursor: this.previousCursors[this.previousCursors.length - 2],
                hasMore: movieData.hasMore,
                nextCursor: movieData.nextCursor
            });

        } catch (err) {
            next(err);
        }
    }

}



module.exports = MoviesApiHandler;