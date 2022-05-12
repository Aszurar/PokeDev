

export interface PokemonDetailsDTO {
    id: number;
    name: string;
    order: number;
    weight: number;
    height: number;
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
    }[]
}
