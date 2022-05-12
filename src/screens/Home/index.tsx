import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { PokemonList } from '../../components/PokemonList';
import { SearchInput } from '../../components/SearchInput';
import { api } from '../../services/api';

import {
    CardContainer,
    Container,
    LoadingListContainer,
    PokemonListContainer,
    SearchContainer,
    TotalPokemonContainer,
    TotalPokemonText
} from './styles';



interface IIndividualPokemon {
    name: string;
}

export interface IGeralSearch {
    count: number;
    results: {
        name: string;
        url: string;
    }[];
}

interface ISearching {
    search: boolean;
    searchType: 'individual' | 'general';
}

export function Home() {
    const [pokemonList, setPokemonList] = useState<IGeralSearch>({} as IGeralSearch);
    const [individualPokemon, setIndividualPokemon] = useState<IIndividualPokemon>({} as IIndividualPokemon);
    const [pokemonName, setPokemonName] = useState('');
    const [searching, setSearching] = useState<ISearching>({ search: false, searchType: 'general' });
    const [isLoading, setIsLoading] = useState(true);


    function handleInputName(text: string) {
        setPokemonName(text);
    }

    function handleSwitchResultComponentSearch(name: string) {
        if (!!name) {
            setSearching({
                search: true,
                searchType: 'individual'
            });
        } else {
            setSearching({
                search: false,
                searchType: 'general'
            });
        }
    }

    async function individualSearch() {
        setIsLoading(true);
        try {
            const response = await api.get(`/pokemon/${pokemonName.toLowerCase()}`);
            const data = response.data as IIndividualPokemon;
            setIndividualPokemon(data);
        } catch (err) {
            console.log('erro:', err)
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        async function loadPokemonList() {
            try {
                setIsLoading(true);
                const response = await api.get('/pokemon?limit=100000&offset=0');
                const data = response.data as IGeralSearch;
                setPokemonList(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadPokemonList();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header
                    title='PokeDev'
                    subtitle='Lista de Pokémons'
                />

                <SearchContainer>
                    <SearchInput
                        name={pokemonName}
                        isLoading={isLoading}
                        setName={handleInputName}
                        individualSearch={individualSearch}
                        onSubmit={handleSwitchResultComponentSearch}
                    />

                    <TotalPokemonContainer>
                        {isLoading ? (
                            <LottieView
                                source={pokeballAnimation}
                                style={{ height: RFValue(24) }}
                                resizeMode="contain"
                                autoPlay={isLoading}
                                loop
                            />
                        ) :
                            (<TotalPokemonText
                                style={{
                                    includeFontPadding: false,
                                }}>
                                {!!pokemonName ? '1' : pokemonList.results.length}
                            </TotalPokemonText>)
                        }
                    </TotalPokemonContainer>

                </SearchContainer>

                <PokemonListContainer>
                    {isLoading ? (
                        <LoadingListContainer>
                            <LottieView
                                source={pokeballAnimation}
                                style={{ height: RFValue(100) }}
                                resizeMode="contain"
                                autoPlay
                                loop
                            />
                        </LoadingListContainer >
                    ) :
                        (searching.searchType === 'general' && (
                            <PokemonList
                                data={pokemonList.results}
                            />
                        ))
                        ||
                        (searching.searchType === 'individual' && (
                            <CardContainer>
                                <Card
                                    name={individualPokemon.name}
                                />
                            </CardContainer>
                        ))}
                </PokemonListContainer>
            </Container>
        </TouchableWithoutFeedback>
    );
}
