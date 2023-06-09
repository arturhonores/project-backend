const axios = require('axios')

class MoviesApiHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://streaming-availability.p.rapidapi.com/v2',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    })
    this.previousCursors = []
  }

  createQueryParams(cursor, services, genres, year_min, year_max) {
    return {
      country: 'es',
      services: services || 'prime.subscription,netflix,disney,hbo',
      output_language: 'en',
      genres: genres || '1, 2, 3, 4, 5, 6, 7, 12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749, 10751, 10752, 10763, 10764, 10767',
      show_type: 'movie',
      genres_relation: 'or',
      show_original_language: 'en',
      year_min: year_min || '2023',
      year_max: year_max || '2023',
      order_by: 'year',
      desc: 'false',
      cursor: cursor
    };
  }

  updatePreviousCursors(cursor) {
    if (cursor) {
      const index = this.previousCursors.indexOf(cursor)
      if (index !== -1) {
        this.previousCursors = this.previousCursors.slice(0, index)
      } else {
        this.previousCursors.push(cursor)
      }
    }
  }

  //iterar dentro del objeto streamingInfo
  processStreamingInfo(movie) {
    const streamingData = {}
    const streamingInfo = movie.streamingInfo['es']

    for (const platform in streamingInfo) {
      streamingData[platform] = {
        url: streamingInfo[platform][0].link,
      };
    }
    return streamingData
  }


  getMovies(req) {
    const cursor = req.query.cursor || ''
    this.updatePreviousCursors(cursor)

    const options = {
      method: 'GET',
      url: '/search/basic',
      params: this.createQueryParams(cursor)
    }

    return this.axiosApp
      .request(options)
      .then(response => {
        const movieData = response.data

        const movies = movieData.result.map(movie => {
          return {
            ...movie,
            streamingData: this.processStreamingInfo(movie),
          }
        })
        return {
          movie: {
            ...movieData,
            result: movies,
          },
          hasPrevious: this.previousCursors.length > 1,
          previousCursor: this.previousCursors[this.previousCursors.length - 2],
          hasMore: movieData.hasMore,
          nextCursor: movieData.nextCursor
        }
      })
  }

getMovieDetails(imdbId) {
  const options = {
    method: 'GET',
    url: '/get/basic',
    params: {
      imdb_id: imdbId,
      country: 'es',
    }
  }

  return this.axiosApp
    .request(options)
      .then(response => response.data)
    .catch(err => console.error(err))
}

  getFilteredMovies(req) {
    const { cursor, services, genres, year_min, year_max } = req.body

    const options = {
      method: 'GET',
      url: '/search/basic',
      params: this.createQueryParams(cursor, services, genres, year_min, year_max)
    }

    return this.axiosApp
      .request(options)
      .then(response => {
        const movieData = response.data

        const movies = movieData.result.map(movie => {
          return {
            ...movie,
            streamingData: this.processStreamingInfo(movie),
          }
        })

        return {
          movie: {
            ...movieData,
            result: movies
          },
          services: services,
          genres: genres,
          year_min: year_min,
          year_max: year_max,
          hasPrevious: this.previousCursors.length > 1,
          previousCursor: this.previousCursors[this.previousCursors.length - 2],
          hasMore: movieData.hasMore,
          nextCursor: movieData.nextCursor
        }
      })
  }
}



module.exports = MoviesApiHandler