const axios = require('axios')

class SeriesApiHandler {
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

  createQueryParams(cursor, services, genres, year_min, year_max, imdb_id) {
    return {
      country: 'es',
      services: services || 'prime.subscription,netflix,disney,hbo',
      output_language: 'en',
      genres: genres || '1, 2, 3, 4, 5, 6, 7, 12, 14, 16, 18, 27, 28, 35, 36, 37, 53, 80, 99, 878, 9648, 10402, 10749, 10751, 10752, 10763, 10764, 10767',
      show_type: 'series',
      genres_relation: 'or',
      show_original_language: 'en',
      year_min: year_min || '2023',
      year_max: year_max || '2023',
      order_by: 'year',
      desc: 'false',
      cursor: cursor
    }
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

  processStreamingInfo(show) {
    const streamingData = {}
    const streamingInfo = show.streamingInfo['es']

    for (const platform in streamingInfo) {
      streamingData[platform] = {
        url: streamingInfo[platform][0].link,
      }
    }
    return streamingData
  }

  getSeries(req, res, next) {
    const cursor = req.query.cursor || ''

    this.updatePreviousCursors(cursor)



    const options = {
      method: 'GET',
      url: '/search/pro',
      params: this.createQueryParams(cursor)
    }

    this.axiosApp
      .request(options)
      .then(response => {
        const showData = response.data

        const shows = showData.result.map(show => {
          return {
            ...show,
            streamingData: this.processStreamingInfo(show),
          }
        })

        res.render('api/new-series', {
          show: {
            ...showData,
            result: shows,
          },
          hasPrevious: this.previousCursors.length > 1,
          previousCursor: this.previousCursors[this.previousCursors.length - 2],
          hasMore: showData.hasMore,
          nextCursor: showData.nextCursor
        })

   
      })
      .catch(err => {next(err)})
  }

// getSeriesDetails(req, res, next) {
//   const { country, services } = req.params
//   const imdb_id = imdb_id

//   const options = {
//     method: 'GET',
//     url: '/get/basic',
//     params: {
//       imdb_id: imdb_id,
//       country: country || 'es',
//       services: services || 'prime.subscription,netflix,disney,hbo'
//     }
//   }

//   this.axiosApp
//     .request(options)
//     .then(response => {
//       const showData = response.data

//       const showDetails = {
//         title: showData.title,
//         cast: showData.cast,
//         firstAirYear: showData.firstAirYear,
//         lastAirYear: showData.lastAirYear,
//         imdbRating: showData.imdbRating,
//         imdb_id: imdb_id,
//         genres: showData.genres,
//         creators: showData.creators,
//         seasonCount: showData.seasonCount,
//         posterPath: showData.posterPath,
//         streamingData: apiHandler.processStreamingInfo(showData)
//       };

//       res.render("api/series-details", { show: showDetails })
//     })
//     .catch(err => next(err))
  
// }

getSeriesDetails(imdbId) {
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


  getFilteredSeries(req, res, next) {
    const { cursor, services, genres, year_min, year_max } = req.body
   

    const options = {
      method: 'GET',
      url: '/search/pro',
      params: this.createQueryParams(cursor, services, genres, year_min, year_max)
    }

    this.axiosApp
      .request(options)
      .then(response => {
        const showData = response.data

        const shows = showData.result.map(show => {
          return {
            ...show,
            streamingData: this.processStreamingInfo(show),
          }
        })

        res.render('api/series-filter', {
          show: {
            ...showData,
            result: shows,
          },
          services: services,
          genres: genres,
          year_min: year_min,
          year_max: year_max,
          hasPrevious: this.previousCursors.length > 1,
          previousCursor: this.previousCursors[this.previousCursors.length - 2],
          hasMore: showData.hasMore,
          nextCursor: showData.nextCursor
        })
      })
      .catch(err => {next(err)})
  }

}

module.exports = SeriesApiHandler