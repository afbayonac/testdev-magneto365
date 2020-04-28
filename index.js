/*
  Prueba nodejs
*/
const fetch = require('./fetch')
const changeToSecure = (url) => [
  url.slice(0, 4),
  's',
  url.slice(4)
].join('')

const flatByPrperty = (list, property) => {
  console.log(property)
  return list.reduce((aco, e) => [
    ...aco,
    ...e[property]
      .filter(e => aco.indexOf(e) === -1)
      .map(changeToSecure)
  ], [])
}

const getSpecie = (species, urls) => {
  if (urls.length > 0) {
    const specie = species.find(specie => urls[0].indexOf(specie.url) !== -1 )
    return {
      name: specie.name,
      language: specie.language,
      average_height: specie.average_height
    }
  }

  return {
    name: 'human',
    language: 'english',
    average_height: '1.72'
  }
}

const fetchUrls =(urls) => Promise.all(urls.map(fetch))

async function filmsSW () {
  const FILMS_URL = 'https://swapi.dev/api/films/'
  const response = await fetch(FILMS_URL)
  const movies = response.results

  const planets = await fetchUrls(flatByPrperty(movies, 'planets'))
  const characters = await fetchUrls(flatByPrperty(movies, 'characters'))
  const species = await fetchUrls(flatByPrperty(characters, 'species'))
  const homeworlds = await fetchUrls(characters.map(e => changeToSecure(e.homeworld)))
  const starships = await fetchUrls(flatByPrperty(movies, 'starships'))

  const starship = starships
    .reduce((aco, startship) => {
      if (!aco || aco.length < startship.length) {
        return startship
      } else {
        return aco
      }
    })

  const data = movies.map(movie => ({
    name: movie.name,
    planets: planets.map(planet => ({
      name: planet.name,
      terrain: planet.terrain,
      gravity: planet.gravity,
      diameter: planet.diameter,
      population: planet.population
    })),
    characters: characters.map(character => ({
      name: character.name,
      gender: character.gender,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      homeworld: homeworlds
        .find(h => h.url === character.homeworld).name,
      species: getSpecie(species, character.species)
    })),
    starships: {
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      passengers: starship.passengers
    }
  }))

  console.log(JSON.stringify(data, null, 2))
}

filmsSW()

module.exports = filmsSW
