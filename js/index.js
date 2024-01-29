const requestUrl = "https://pokeapi.co/api/v2/pokemon/";
const cardsContainer = document.getElementById('pokemon-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalBackdrop = document.getElementById('modalBackdrop');

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
                <button onclick="getPokemonDetails('${pokemon.url}')">Learn more</button>
            </div>
        `).join('');

        cardsContainer.innerHTML = cards;
    })
    .catch(error => console.log(error));

function getPokemonDetails(url) {
    sendRequest('Get', url)
        .then(data => {
            displayModal(data);
        })
        .catch(error => console.log(error));
}  

function displayModal(pokemon) {
    const statsHtml = pokemon.stats.map(entry => `
        <li class="stats">${entry.stat.name}: ${entry.base_stat}</li>
    `).join('');

    modalContent.innerHTML = `
        <h2 class="name">${pokemon.name}</h2>
        <img class="pokemon_img" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <ul>${statsHtml}</ul>
        <button class="close" onclick="closeModal()">&times;</button>
    `;
    modal.style.display = "block";
    modalBackdrop.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalBackdrop.style.display = "none";
}