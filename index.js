/*
  Prueba nodejs
*/
const fetch = require('./fetch')
const changeToSecure = (url) => [
  url.slice(0, 4),
  's',
  url.slice(4)
].join('')

const flatByPrperty = (list, Property) => {
  return list.reduce((aco, e) => [
    ...aco,
    ...e[Property]
      .filter(e => aco.indexOf(e) === -1)
      .map(changeToSecure)
  ], [])
}

const fetchUrls =(urls) => Promise.all(urls.map(fetch))

async function filmsSW () {
  const FILMS_URL = 'https://swapi.dev/api/films/'
  const response = await fetch(FILMS_URL)
  const movies = response.results

  const planets = await fetchUrls(flatByPrperty(movies, 'planets'))
  const characters = await fetchUrls(flatByPrperty(movies, 'species'))
  const species = await fetchUrls(flatByPrperty(characters, 'species'))
  const startship = await fetchUrls(flatByPrperty(movies, 'startship'))

  console.log(species)
  return movies.map(movie => ({
    name: movie.name,
    planets: planets.map(planete => ({

    })),
    characters: planets.map(planete => ({

    })),
    startships: planets
      .reduce((aco, startship) => {
        if (!aco || aco.length < startship.length) {
          return startship
        } else {
          return aco
        }
      })
      .map(planete => ({

      }))

  }))
}

console.log(filmsSW())

// module.exports = filmsSW
