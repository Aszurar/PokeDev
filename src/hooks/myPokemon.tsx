import React, { createContext, ReactNode, useContext, useState } from 'react';
import { SpeciesDataDTO } from '../dtos/SpeciesDataDTO';
import { IPokemonDetails } from './individualSearch';
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IMyPokemonProvider {
    children: ReactNode;
}

export interface IMyPokemonDetails {
    detailsDataSaved: IPokemonDetails
    speciesDataSaved: SpeciesDataDTO
}


interface IMyPokemonContext {
    savePokemon: (pokemonData: IMyPokemonDetails) => void;
    getAllMyPokemon: () => Promise<IMyPokemonDetails[]>;
}

const myPokemonContext = createContext({} as IMyPokemonContext);

function MyPokemonProvider({ children }: IMyPokemonProvider) {
    const dataKey = '@pokemonData'

    async function savePokemon(pokemonData: IMyPokemonDetails) {
        const { detailsDataSaved, speciesDataSaved } = pokemonData;

        const oldData = await AsyncStorage.getItem(dataKey);
        const oldDataFormated: IMyPokemonDetails[] = oldData ? JSON.parse(oldData) : [];

        const newData = [
            ...oldDataFormated,
            pokemonData
        ]

        await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

    }

    async function getAllMyPokemon() {
        const dataKey = '@pokemonData'
        const data = await AsyncStorage.getItem(dataKey);
        const dataFormated: IMyPokemonDetails[] = data ? JSON.parse(data) : [];
        // console.log
        return dataFormated;
    }


    return (
        <myPokemonContext.Provider value={{ savePokemon, getAllMyPokemon }}>
            {children}
        </myPokemonContext.Provider>
    );
}

function useMyPokemon() {
    const context = useContext(myPokemonContext);
    if (!context) {
        throw new Error("useMyPokemon must be used within a MyPokemonProvider");
    }
    return context;
}

export { MyPokemonProvider, useMyPokemon }
