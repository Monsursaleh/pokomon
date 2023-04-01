// global variables for storing date for pokemons
let pokeArrbyGen = []
let pokemonsType = []

//genreation array for fetching data by limit and fetching data
//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

const generations = [
  { limit: 151, offset: 0 },
  { limit: 100, offset: 151 },
  { limit: 135, offset: 251 },
  { limit: 107, offset: 386 },
  { limit: 156, offset: 493 },
  { limit: 72, offset: 649 },
  { limit: 88, offset: 721 },
  { limit: 96, offset: 809 },
  { limit: 105, offset: 905 },
  { limit: 1010, offset: 0 },
]

// array for types
const typeArr = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
]

// adding type checkboxes
const searchType = document.querySelector('.type_form')

let createType = (arr) => {
  let htmlChekbox = arr.map(
    (element) => `
  <div>
  <input class="type_input" type="checkbox" id="${element}" />
  <label for="${element}"><img src="img/${element}.png" alt="${element}" /></label>
  </div>`
  )
  searchType.innerHTML = htmlChekbox
}
createType(typeArr)

// ftching pokemons main fucntion
const fetchPokemons = async (btn) => {
  // for every new fetch new pokemons coming
  pokedex.innerHTML = ''
  pokeArrbyGen = []
  // first fetch
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${generations[btn].limit}&offset=${generations[btn].offset}`
  )

  const data = await res.json()
  const results = data.results

  // second fetch for each pokemons url to get the data
  results.map(async (item) => {
    const name = item.name
    const res2nd = await fetch(item.url)
    const data2nd = await res2nd.json()
    // calling the fucntion to get pokemons
    let pokemons = createPokemonsObj(data2nd)
    // pushing the pokemons object in the difined array
    pokeArrbyGen.push(pokemons)
    displayPokemons(pokeArrbyGen)
  })
}

// creating pokemons fucntion defination
let createPokemonsObj = (data) => {
  let createPokemons = {
    name: data.name,
    image: data.sprites.front_default,
    type: data.types.map((type) => type.type.name).join(' , '),
    id: data.id,
  }
  return createPokemons
}

// fucntion to display pokemon
const displayPokemons = (pokemons) => {
  const pokemonHTMLString = pokemons
    .map(
      (pokemon) =>
        `
        <li class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <div class='title>
            <h3 class="card-title">${pokemon.id}. ${pokemon.name}</h3>
            <h3 class="card-subtitle">Type: ${pokemon.type}</h3>
            </div>
        </li>
    `
    )
    .join('')

  pokedex.innerHTML = pokemonHTMLString
}

// calling for each for call back function buttons
const buttons = document.querySelectorAll('.genButton')
buttons.forEach((button) => {
  const btn = button.getAttribute('value')

  button.addEventListener('click', () => {
    fetchPokemons(btn)
  })
})

//  selecting  by checkboxes
const checkboxes = document.querySelectorAll('.type_input')

function sortbyType(arr) {
  const selectedTypes = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id)
  const filtering_Arr = arr.filter((pokemon) => {
    return pokemon.type.split(', ').some((type) => selectedTypes.includes(type))
  })
  displayPokemons(filtering_Arr)
}
// cehckbox event listener
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    sortbyType(pokeArrbyGen)
  })
})

// seach by name
const searchNameId = document.querySelector('#search_id')

// event listener key up handler
searchNameId.addEventListener('keyup', () => {
  const searched_Name = searchNameId.value
  const filtering_Arr = pokeArrbyGen.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searched_Name.toLowerCase())
  })
  displayPokemons(filtering_Arr)
})
