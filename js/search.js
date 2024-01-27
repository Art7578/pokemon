// В начале вашего скрипта добавьте переменную для хранения исходного содержимого контейнера
const originalContent = cardsContainer.innerHTML;

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
            // Если покемон не найден, восстанавливаем исходное содержимое контейнера
            cardsContainer.innerHTML = `<img class ="not_found_image" src="../img/not_found.jpg" alt="">`;
            console.log(error);
        });
}

// После того, как поле ввода очищается, восстанавливаем исходное содержимое контейнера
function clearSearch() {
    document.getElementById('pokemonNameInput').value = '';
    cardsContainer.innerHTML = originalContent;
}
