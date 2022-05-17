import React from 'react';
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
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Loader } from '../../components/Loader';

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header
                    title='PokeDev'
                    subtitle='Lista de Pokémons'
                />

                <SearchContainer>
                    <SearchInput />

                    <TotalPokemonContainer>
                        {generalListLoading ? (
                            <Loader
                                width={RFValue(24)}
                                animationName='pokeball'
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
                        <Loader
                            animationName='diglet'
                            width={RFValue(400)}
                        />
                    </ErrorComponent>
                ) : (
                    <PokemonListContainer>
                        {(generalListLoading || individualSearchLoading) ? (
                            <LoadingListContainer>
                                <Loader
                                    animationName='pokeball'
                                    width={RFValue(200)}
                                />
                            </LoadingListContainer >
                        ) :
                            <View onStartShouldSetResponder={() => true}>
                                <PokemonList
                                    data={pokemonList.results}
                                />
                            </View>
                        }
                    </PokemonListContainer>
                )}
            </Container>
        </TouchableWithoutFeedback>
    );
}
