class Pokemon {
    constructor( name, image, points, types) {
        this.name = name;
        this.image = image;
        this.points = points;
        this.types = types;
    }

    displayDetails() {
        return `Nombre: ${this.name}, Puntos: ${this.points}, Tipo: ${this.types}`;;
    }
}

// Subclasses per tipus de Pokémon
class GrassPokemon extends Pokemon {}
class FirePokemon extends Pokemon {}
class WaterPokemon extends Pokemon {}
class ElectricPokemon extends Pokemon {}
class DragonPokemon extends Pokemon {}

class PokemonTeam {
    constructor(maxCredits) {
        this.selectedTeam = [];
        this.credits = maxCredits;
    }

    addPokemon(pokemon) {
        if (this.credits - pokemon.points >= 0) {
            this.selectedTeam.push(pokemon);
            this.credits -= pokemon.points;
        } else {
            console.log("No tens prou crèdits per afegir aquest Pokémon!");
        }
    }

    removePokemon(pokemonName) {
        const index = this.selectedTeam.findIndex(p => p.name === pokemonName);
        if (index !== -1) {
            this.credits += this.selectedTeam[index].points;
            this.selectedTeam.splice(index, 1);
        } else {
            console.log("Aquest Pokémon no està a l'equip!");
        }
    }

    getTeamDetails() {
        return this.selectedTeam.map(p => p.displayDetails()).join("\n");
    }

    getCredits() {
        return this.credits;
    }
}

class PokemonList {
    constructor() {
        this.allPokemons = [];
    }

    loadPokemons(pokemons) {
        this.allPokemons = pokemons.map(pokemonData => {
            switch (pokemonData.types) {
                case "Grass":
                    return new GrassPokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types
                    );
                case "Fire":
                    return new FirePokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types

                    );
                case "Water":
                    return new WaterPokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types

                    );
                case "Electric":
                    return new ElectricPokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types

                    );
                case "Dragon":
                    return new DragonPokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types

                    );
                default:
                    return new Pokemon(
                        pokemonData.name,
                        pokemonData.image,
                        pokemonData.points,
                        pokemonData.types

                    );
            }
        });
    }

    sortPokemons(criteria, method) {
        const compareFn = {
            name: (a, b) => a.name.localeCompare(b.name),
            points: (a, b) => a.points - b.points,
            types: (a, b) => {
                // Si 'types' es un array, ordenando por el primer tipo
                const typeA = Array.isArray(a.types) ? a.types[0] : a.types;
                const typeB = Array.isArray(b.types) ? b.types[0] : b.types;
                return typeA.localeCompare(typeB);
            },

        }[criteria];

        if (!compareFn) {
            console.log("Criteri no vàlid!");
            return;
        }

        if (method === "bubble") this.bubbleSort(compareFn);
        else if (method === "insertion") this.insertionSort(compareFn);
        else if (method === "selection") this.selectionSort(compareFn);
        else console.log("Mètode no vàlid!");
    }

    bubbleSort(compareFn) {
        const arr = this.allPokemons;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (compareFn(arr[j], arr[j + 1]) > 0) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    }

    insertionSort(compareFn) {
        const arr = this.allPokemons;
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && compareFn(arr[j], key) > 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    selectionSort(compareFn) {
        const arr = this.allPokemons;
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (compareFn(arr[j], arr[minIndex]) < 0) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
        }
    }

    getPokemonByName(name) {
        return this.allPokemons.find(pokemon => pokemon.name === name);
    }
}




function displayPokemonList(pokemons) {
    const listElement = document.getElementById("pokemon-list");
    listElement.innerHTML = "";
    pokemons.forEach(pokemon => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.displayDetails();
        listElement.appendChild(listItem);
    });
}

function sortAndDisplay(criteria, method) {
    pokemonList.sortPokemons(criteria, method);
    displayPokemonList(pokemonList.allPokemons);
}