const pokemonName = document.querySelector(".pokemon__name");
var pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
 
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
 
let searchPokemon = 1;
 
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
 
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
 
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon);
 
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML =  "Not Found !!";
        pokemonNumber.innerHTML =  '';
        pokemonImage.style.display = 'none';
    }
};
 
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});
 
prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});
 
next.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});
 
renderPokemon(searchPokemon);