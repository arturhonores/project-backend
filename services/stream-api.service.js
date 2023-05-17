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

    createQueryParams(cursor, services, genres) {
        return {
            country: 'es',
            services: services || 'prime.subscription,netflix,disney,hbo',
            output_language: 'en',
            genres: genres || '1,3,4,5,12',
            show_type: 'movie',
            genres_relation: 'or',
            show_original_language: 'en',
            year_min: '2023',
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

    //iterar dentro del objeto streamingInfo
    processStreamingInfo(movie) {
        const streamingData = {};
        const streamingInfo = movie.streamingInfo['es'];

        for (const platform in streamingInfo) {
            streamingData[platform] = {
                url: streamingInfo[platform][0].link,
            };
        }
        return streamingData;
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

            //para obtener info de streamingInfo
            const movies = response.data.result.map(movie => {
                return {
                    ...movie,
                    streamingData: this.processStreamingInfo(movie),
                };
            });
            //

            res.render('api/new-movie', {
                movie: {
                    ...movieData,
                    result: movies,
                },
                hasPrevious: this.previousCursors.length > 1,
                previousCursor: this.previousCursors[this.previousCursors.length - 2],
                hasMore: movieData.hasMore,
                nextCursor: movieData.nextCursor
            });

            console.log(response.data);
            // saber qué contiene el elemento streamingInfo
            // const movies = response.data.result;

            // movies.forEach(movie => {
            //     console.log(movie.streamingInfo); // Para ver la información de streaming de la película
            // });

            // movies.forEach(movie => {
            //     for (const country in movie.streamingInfo) {
            //         console.log(`Información de streaming para el país ${country}:`, movie.streamingInfo[country]);
            //     }
            // });
            // ///////////////////////////////////////////7


        } catch (err) {
            next(err);
        }
    }

    async getFilteredMovies(req, res, next) {
<<<<<<< HEAD
         
        const { country, services, genres } = req.body;
=======
        const { cursor, services, genres } = req.body;
        console.log(req.body)
>>>>>>> bab39d2ecdd4122a2b302edfd745b04db779c024


        try {
            const options = {
                method: 'GET',
                url: '/search/pro',
                params: this.createQueryParams(cursor, services, genres)
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