const requestUrl = "https://pokeapi.co/api/v2/pokemon/"
const cardsContainer = document.getElementById('pokemon-container');

function sendRequest(method, url, body = null) {
    return fetch(url).then(response => {
        return response.json()
    })
}

sendRequest('Get', requestUrl)
    .then(data => {
        const cards = data.results.map(pokemon => `
            <div class="pokemon-card">
                <h3>${pokemon.name}</h3>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" alt="">
                <button>Learn more</button>
            </div>
        `).join('');

        cardsContainer.innerHTML = cards;
    })
    .catch(error => console.log(error));
