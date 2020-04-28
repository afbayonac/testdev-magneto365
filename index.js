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
  const species = await fetchUrls(flatByPrperty(movies, 'species'))
  // const planets = await fetchUrls(flatByPrperty(movies, 'p'))
  // const species = await fetchUrls(flatByPrperty(movies, 'species'))
  // const species = await fetchUrls(flatByPrperty(movies, 'species'))
  // const species = await fetchUrls(flatByPrperty(movies, 'species'))
  console.log(species)
  return movies.map(movie => ({
    ...movie,
    species
  }))
}

console.log(filmsSW())

// module.exports = filmsSW
