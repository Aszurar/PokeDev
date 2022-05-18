import React, { useEffect, useRef, useState } from 'react';
import PokeballIcon from '../../assets/icons/pokeball.svg';
import { Search, XCircle } from 'react-native-feather';
import { useTheme } from 'styled-components/native';

import {
    Button,
    Container,
    IconContainer,
    Input,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useGeneralSearch } from '../../hooks/generalSearch';
import { useIndividualSearch } from '../../hooks/individualSearch';
import { Loader } from '../Loader';

type IResponse = { name: string, url: string }[]

export function SearchInput() {
    const theme = useTheme();

    const { generalSearchProps } = useGeneralSearch();
    const {
        loadPokemonList,
        generalListLoading,
        setTotalPokemon,
        pokemonList,
        setListShowedInComponents

    } = generalSearchProps;

    const { individualSearchProps } = useIndividualSearch();
    const {
        individualSearchError,
        setIndividualSearchError,
        setIndividualSearchLoading
    } = individualSearchProps



    const [pokemonName, setPokemonName] = useState('');
    const [isInputInFocus, setIsInputInFocus] = useState(false);
    const [resetSearch, setIsResetSearch] = useState(false);

    function handleInputInFocus() {
        setIsInputInFocus(true);
    }
    function handleInputInBlur() {
        setIsInputInFocus(false);
    }

    function handleActivateResetButton() {
        setIsResetSearch(true);
    };

    async function handleResetSearch() {
        setPokemonName('');
        setIsResetSearch(false);
        setIndividualSearchError(false);

        try {
            await loadPokemonList();
        } catch (error) {
            console.error(error);
        }


    }

    async function searchPokemonByName() {
        setIndividualSearchLoading(true)
        setIndividualSearchError(false);
        try {
            const response: IResponse = pokemonList.results
                .filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()));

            setTotalPokemon(response.length);

            if (response.length > 0) {
                setListShowedInComponents({
                    count: response.length,
                    results: response
                });
            } else {
                setIndividualSearchError(true);
            }
        } catch (error) {
            console.log('Erro: ', error);
            setIndividualSearchError(true);
        } finally {
            setIndividualSearchLoading(false);
            handleActivateResetButton();
        }
    }

    return (
        <Container>
            <IconContainer>
                {(isInputInFocus || generalListLoading) ?
                    (<Loader
                        animationName='pokeball'
                        width={RFValue(24)}
                    />) :
                    (<PokeballIcon
                        width={RFValue(24)}
                        height={RFValue(24)}
                    />)
                }
            </IconContainer>
            {!generalListLoading &&
                (<Input
                    autoCorrect={false}
                    autoComplete="off"
                    returnKeyType="send"
                    onBlur={handleInputInBlur}
                    onFocus={handleInputInFocus}
                    placeholder="Buscar Pokémon"
                    onChangeText={setPokemonName}
                    onSubmitEditing={() => { pokemonName === "" ? handleResetSearch() : searchPokemonByName() }}
                    value={pokemonName}
                    style={{
                        includeFontPadding: false
                    }}
                />)
            }


            {
                (resetSearch || individualSearchError) && (
                    <Button
                        onPress={handleResetSearch}

                    >
                        <IconContainer
                            style={{
                                backgroundColor: theme.colors.danger,
                            }}
                        >
                            <XCircle
                                width={RFValue(24)}
                                height={RFValue(24)}
                                strokeWidth={2}
                                stroke={theme.colors.shape}
                            />
                        </IconContainer>
                    </Button>
                )
            }

            {
                !generalListLoading && (
                    <Button
                        onPress={() => { pokemonName === "" ? handleResetSearch() : searchPokemonByName() }}
                    >
                        <IconContainer>
                            <Search
                                width={RFValue(24)}
                                height={RFValue(24)}
                                strokeWidth={2}
                                stroke={theme.colors.danger}
                            />
                        </IconContainer>
                    </Button>)
            }
        </Container >
    );
}
