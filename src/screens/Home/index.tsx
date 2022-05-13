import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import digletAnimation from '../../assets/diglet.json';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { PokemonList } from '../../components/PokemonList';
import { SearchInput } from '../../components/SearchInput';
import { api } from '../../services/api';

import {
    CardContainer,
    Container,
    ErrorComponent,
    ErrorSearchContainer,
    ErrorText,
    LoadingListContainer,
    PokemonListContainer,
    SearchContainer,
    TotalPokemonContainer,
    TotalPokemonText
} from './styles';
import { Search } from 'react-native-feather';
import { useTheme } from 'styled-components/native';



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
    const [totalPokemon, setTotalPokemon] = useState(0);
    const [searching, setSearching] = useState<ISearching>({ search: false, searchType: 'general' });
    const [isLoading, setIsLoading] = useState(true);
    const [searchError, setSearchError] = useState(false);

    const theme = useTheme();

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
            setSearchError(false);
            setTotalPokemon(1);
        } catch (err) {
            setSearchError(true);
            setTotalPokemon(0);
            console.log('erro:', err)
        } finally {
            setIsLoading(false);
        }

    }

    async function loadPokemonList() {
        try {
            setIsLoading(true);
            const response = await api.get('/pokemon?limit=100000&offset=0');
            const data = response.data as IGeralSearch;
            setPokemonList(data);
            setSearchError(false);
            setTotalPokemon(data.results.length);
        } catch (err) {
            setSearchError(true);
            setTotalPokemon(0);
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
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
                        generalSearch={loadPokemonList}
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
                                {String(totalPokemon)}
                            </TotalPokemonText>)
                        }
                    </TotalPokemonContainer>

                </SearchContainer>

                {searchError ? (
                    <ErrorComponent>
                        <ErrorSearchContainer>
                            <Search
                                width={RFValue(100)}
                                height={RFValue(100)}
                                color={theme.colors.dark}
                                strokeWidth={2}
                            />
                            <ErrorText>
                                Ocorreu um erro ao buscar o Pokémon, verifique se o nome está correto e tente novamente.
                            </ErrorText>
                        </ErrorSearchContainer>
                        <LottieView
                            source={digletAnimation}
                            style={{ width: '100%', top: RFValue(29) }}
                            resizeMode="contain"
                            autoPlay
                            loop
                        />
                    </ErrorComponent>
                ) : (
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
                )}
            </Container>
        </TouchableWithoutFeedback>
    );
}
