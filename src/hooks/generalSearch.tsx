import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


export interface IGeneralSearchProvider {
    children: ReactNode;
}

interface IGeneralSearch {
    count: number;
    results: {
        name: string;
        url: string;
    }[];
}


interface IGeneralSearchProps {
    totalPokemon: number;
    pokemonList: IGeneralSearch;
    setPokemonList: (object: IGeneralSearch) => void;
    setTotalPokemon: (value: number) => void;
    loadPokemonList: () => Promise<void>;
    listShowedInComponents: IGeneralSearch;
    setListShowedInComponents: (object: IGeneralSearch) => void;
    generalListLoading: boolean;
    setGeneralListLoading: (value: boolean) => void;
    generalListError: boolean;
    setGeneralListError: (value: boolean) => void;
}

interface IGeneralSearchContext {
    generalSearchProps: IGeneralSearchProps;
}

const defaultPokemonList = {
    count: 0,
    results: [{
        name: '',
        url: ''
    }]
};

const GeneralSearchContext = createContext({} as IGeneralSearchContext);


function GeneralSearchProvider({ children }: IGeneralSearchProvider) {
    const [pokemonList, setPokemonList] = useState<IGeneralSearch>(defaultPokemonList as IGeneralSearch);
    const [listShowedInComponents, setListShowedInComponents] = useState<IGeneralSearch>(defaultPokemonList as IGeneralSearch);
    const [generalListLoading, setGeneralListLoading] = useState(true);
    const [generalListError, setGeneralListError] = useState(false);
    const [totalPokemon, setTotalPokemon] = useState(0);


    async function loadPokemonList() {
        try {
            setGeneralListLoading(true);

            const response = await api.get('/pokemon?limit=100000&offset=0');
            const { count, results } = response.data as IGeneralSearch;

            setPokemonList({ count, results });
            setListShowedInComponents({ count, results });
            setTotalPokemon(count);
            setGeneralListError(false);
        } catch (err) {
            setGeneralListError(true);
            console.log(err);
        } finally {
            setGeneralListLoading(false);
        }
    }

    useEffect(() => {
        loadPokemonList();
    }, []);

    const generalSearchProps: IGeneralSearchProps = {
        pokemonList,
        totalPokemon,
        setPokemonList,
        loadPokemonList,
        setTotalPokemon,
        generalListError,
        generalListLoading,
        setGeneralListError,
        setGeneralListLoading,
        listShowedInComponents,
        setListShowedInComponents
    }

    return (
        <GeneralSearchContext.Provider value={{ generalSearchProps }}>
            {children}
        </GeneralSearchContext.Provider>
    );
}


function useGeneralSearch() {
    const context = useContext(GeneralSearchContext);

    if (!context) {
        throw new Error('useGeneralSearch must be used within a GeneralSearchProvider');
    }

    return context;
}

export { GeneralSearchProvider, useGeneralSearch };


