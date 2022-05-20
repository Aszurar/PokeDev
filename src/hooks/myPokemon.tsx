import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PokemonDTO } from '../dtos/PokemonDTO';
import { api } from '../services/api';

interface IMyPokemonProvider {
    children: ReactNode;
}

export interface IPokemonDetails extends PokemonDTO {
    url: string;
}


interface ImyPokemonContext {
    myPokemonProps: {
        myPokemonError: boolean;
        myPokemonLoading: boolean;
        setmyPokemonLoading: (value: boolean) => void;
        setmyPokemonError: (value: boolean) => void;
        myPokemon: (pokemonRouteWithID: string) => Promise<IPokemonDetails>;
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

const myPokemonContext = createContext({} as ImyPokemonContext);

function MyPokemonProvider({ children }: IMyPokemonProvider) {
    const [myPokemonLoading, setmyPokemonLoading] = useState(false);
    const [myPokemonError, setmyPokemonError] = useState(false);
    // const [myPokemon, setmyPokemon] = React.useState<PokemonDTO>(defaultPokemonDetails);

    async function myPokemon(pokemonRouteWithID: string): Promise<IPokemonDetails> {
        setmyPokemonError(false);
        setmyPokemonLoading(true);
        let results: IPokemonDetails = { ...defaultPokemonDetails };
        try {
            const response = await api.get(`${pokemonRouteWithID}`);
            const data = response.data as PokemonDTO;


            results = {
                ...data,
                url: response.config.url!
            }

        } catch (err) {
            setmyPokemonError(true);
            console.log('erro:', err)
        } finally {
            setmyPokemonLoading(false);
            return results;
        }

    }

    const myPokemonProps = {
        myPokemon,
        myPokemonError,
        myPokemonLoading,
        setmyPokemonError,
        setmyPokemonLoading
    };

    return (
        <myPokemonContext.Provider value={{ myPokemonProps }}>
            {children}
        </myPokemonContext.Provider>
    );
}

function usemyPokemon() {
    const context = useContext(myPokemonContext);
    if (!context) {
        throw new Error("usemyPokemon must be used within a MyPokemonProvider");
    }
    return context;
}

export { MyPokemonProvider, usemyPokemon }
