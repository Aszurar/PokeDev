import React from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import digletAnimation from '../../assets/diglet.json';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../../components/Header';
import { PokemonList } from '../../components/PokemonList';
import { SearchInput } from '../../components/SearchInput';

import {
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
import { useGeneralSearch } from '../../hooks/generalSearch';
import { useIndividualSearch } from '../../hooks/individualSearch';

export interface IGeralSearch {
    count: number;
    results: {
        name: string;
        url: string;
    }[];
}

export function Home() {
    const { generalSearchProps } = useGeneralSearch();

    const {
        pokemonList,
        totalPokemon,
        generalListError,
        generalListLoading,
    } = generalSearchProps;

    const theme = useTheme();

    const { individualSearchProps } = useIndividualSearch();
    const { individualSearchLoading, individualSearchError } = individualSearchProps

    return (
        <Container>
            <Header
                title='PokeDev'
                subtitle='Lista de Pokémons'
            />

            <SearchContainer>
                <SearchInput />

                <TotalPokemonContainer>
                    {generalListLoading ? (
                        <LottieView
                            source={pokeballAnimation}
                            style={{ height: RFValue(24) }}
                            resizeMode="contain"
                            autoPlay
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


            {generalListError || individualSearchError ? (
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
                    {(generalListLoading || individualSearchLoading) ? (
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
                        <PokemonList
                            data={pokemonList.results}
                        />
                    }
                </PokemonListContainer>
            )}
        </Container>
    );
}
