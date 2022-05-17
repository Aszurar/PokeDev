import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PokemonDTO } from '../dtos/PokemonDTO';
import { api } from '../services/api';

interface IIndividualSearchProvider {
    children: ReactNode;
}

interface IPokemonDetails extends PokemonDTO {
    url: string;
}


interface IIndividualSearchContext {
    individualSearchProps: {
        individualSearchError: boolean;
        individualSearchLoading: boolean;
        setIndividualSearchLoading: (value: boolean) => void;
        setIndividualSearchError: (value: boolean) => void;
        individualSearch: (name: string) => Promise<IPokemonDetails>;
    };
}


const defaultPokemonDetails = {
    id: 0,
    url: '',
    name: "",
    weight: 0,
    height: 0,
    species: {
        url: "",
    },
    sprites: {
        front_default: "",
    },
    abilities: [{
        ability: {
            name: "",
            url: "",
        }
    }],
    moves: [{
        move: {
            name: "",
            url: "",
        }
    }],
    types: [{
        type: {
            name: "",
            url: "",
        }
    }],
}

const IndividualSearchContext = createContext({} as IIndividualSearchContext);

function IndividualSearchProvider({ children }: IIndividualSearchProvider) {
    const [individualSearchLoading, setIndividualSearchLoading] = useState(false);
    const [individualSearchError, setIndividualSearchError] = useState(false);
    // const [individualSearch, setIndividualSearch] = React.useState<PokemonDTO>(defaultPokemonDetails);

    async function individualSearch(name: string): Promise<IPokemonDetails> {
        setIndividualSearchLoading(true);
        let results: IPokemonDetails = { ...defaultPokemonDetails };
        try {
            const response = await api.get(`/pokemon/${name.toLowerCase()}`);
            const data = response.data as PokemonDTO;


            results = {
                ...data,
                url: response.config.url!
            }

            setIndividualSearchError(false);
        } catch (err) {
            setIndividualSearchError(true);
            console.log('erro:', err)
        } finally {
            setIndividualSearchLoading(false);
            return results;
        }

    }

    const individualSearchProps = {
        individualSearch,
        individualSearchError,
        individualSearchLoading,
        setIndividualSearchError,
        setIndividualSearchLoading
    };

    return (
        <IndividualSearchContext.Provider value={{ individualSearchProps }}>
            {children}
        </IndividualSearchContext.Provider>
    );
}

function useIndividualSearch() {
    const context = useContext(IndividualSearchContext);
    if (!context) {
        throw new Error("useIndividualSearch must be used within a IndividualSearchProvider");
    }
    return context;
}

export { IndividualSearchProvider, useIndividualSearch }
