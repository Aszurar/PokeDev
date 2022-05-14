export interface SpeciesDataDTO {
    id: number;
    evolution_chain: {
        url: string;
    };
    is_legendary: boolean;
    is_mythical: boolean;
    habitat: {
        name: string;
    },
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
        version: {
            name: string;
        }
    }[];
}
