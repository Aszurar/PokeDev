export interface PokemonDetailsDTO {
    id: number;
    name: string;
    weight: number;
    height: number;
    species: {
        url: string;
    }
    sprites: {
        front_default: string;
    };
    abilities: {
            ability: {
                name: string;
                url: string;
            }
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[];
    types: {
        type: {
            name: string;
            url: string;
        }
    }[];
}
