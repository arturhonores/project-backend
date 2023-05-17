// const axios = require('axios');

// class MoviesApiHandler {
//     constructor() {
//         this.axiosApp = axios.create({
//             baseURL: 'https://streaming-availability.p.rapidapi.com/v2',
//             headers: {
//                 'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
//                 'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
//             }
//         });
//         this.previousCursors = [];
//     }

//     createQueryParams(services, genres, cursor) {
//         return {
//             country: 'es',
//             services: services || 'prime.subscription',
//             output_language: 'en',
//             genres: genres || '1',
//             show_type: 'movie',
//             genres_relation: 'or',
//             show_original_language: 'en',
//             year_min: '2000',
//             year_max: '2025',
//             order_by: 'year',
//             desc: 'true',
//             cursor: cursor
//         };
//     }

//     updatePreviousCursors(cursor) {
//         if (cursor) {
//             const index = this.previousCursors.indexOf(cursor);
//             if (index !== -1) {
//                 this.previousCursors = this.previousCursors.slice(0, index);
//             } else {
//                 this.previousCursors.push(cursor);
//             }
//         }
//     }
        
//     getMovies(req, res, next) {
//         const cursor = req.query.cursor || '';

//         this.updatePreviousCursors(cursor);

//         console.log("Valor actual del cursor:", cursor);

//         const options = {
//             method: 'GET',
//             url: '/search/pro',
//             params: this.createQueryParams(cursor)
//         };

//         this.axiosApp
//             .request(options)
//             .then(response => {
//             const movieData = response.data;

//             res.render('api/new-movie', {
//                 movie: movieData,
//                 hasPrevious: this.previousCursors.length > 1,
//                 previousCursor: this.previousCursors[this.previousCursors.length - 2],
//                 hasMore: movieData.hasMore,
//                 nextCursor: movieData.nextCursor
//             });

//             console.log(response.data);
//             })
//             .catch(err => { next(err)})
//         }

//         getFilteredMovies(req, res, next) {
//         const { services, genres } = req.body;

//         const options = {
//             method: 'GET',
//             url: '/search/pro',
//             params: this.createQueryParams(undefined, services, genres)
//         };

//         this.axiosApp
//             .request(options)
//             .then(response => {
//             const movieData = response.data;

//             res.render('api/movie-filter', {movie: movieData})})
//             .
//         }
// }



// module.exports = MoviesApiHandler;