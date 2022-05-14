export interface EvolutionDTO {
    chain: {
        evolves_to: {
            evolves_to: {
                species: {
                    name: string;
                }
            }[];
            species: {
                    name: string;
                }
        }[];
        species: {
            name: string;
        }
    }
}
