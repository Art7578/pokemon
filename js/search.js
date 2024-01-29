function searchPokemon() {
    const pokemonName = document.getElementById('pokemonNameInput').value.toLowerCase();
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    sendRequest('Get', pokemonUrl)
        .then(data => {
            const pokemonCard = `
                <div class="pokemon-card">
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.front_default}" alt="">
                    <button onclick="getPokemonDetails('${pokemonUrl}')">Learn more</button>
                </div>
            `;
            cardsContainer.innerHTML = pokemonCard;
        })
        .catch(error => {
            cardsContainer.innerHTML = `<img class ="not_found_image" src="../img/not_found.jpg" alt=""></img>`;
            console.log(error);
        });
}
