/*
  Prueba nodejs
*/
const fetch = require('./fetch')

async function filmsSW () {
  const FILMS_URL = 'https://swapi.dev/api/films/'
  const response = await fetch(FILMS_URL)
  const movies = response.results

  return movies
}

filmsSW()

// module.exports = filmsSW
