import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
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
import { Keyboard, TextInput } from 'react-native';


export function SearchInput() {
    const theme = useTheme();

    const { generalSearchProps } = useGeneralSearch();
    const { loadPokemonList, generalListLoading, setPokemonList, setTotalPokemon } = generalSearchProps;

    const { individualSearchProps } = useIndividualSearch();
    const { individualSearch, individualSearchError, setIndividualSearchError } = individualSearchProps


    const [pokemonName, setPokemonName] = useState('');
    const [isInputInFocus, setIsInputInFocus] = useState(false);
    const [resetSearch, setIsResetSearch] = useState(false);

    const inputRef = useRef<TextInput>(null);

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

    async function handleIndividualSearch() {
        try {
            const data = await individualSearch(pokemonName);
            const results = {
                count: data.name !== '' ? 1 : 0,
                results: [{
                    name: data.name,
                    url: data.url
                }]
            }

            setPokemonList(results);
            setTotalPokemon(results.count);
            handleActivateResetButton();
        } catch (error) {
            console.log('Erro: ', error)
        } finally {
            handleActivateResetButton();
        }
    }

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                handleInputInBlur();
                inputRef.current?.blur();
            },
        );

        return () => {
            keyboardDidHideListener.remove();
        };

    }, [Keyboard])


    return (
        <Container>
            <IconContainer>
                {(isInputInFocus || generalListLoading) ?
                    (<LottieView
                        source={pokeballAnimation}
                        style={{ height: RFValue(24) }}
                        resizeMode="contain"
                        autoPlay
                        loop
                    />) :
                    (<PokeballIcon
                        width={RFValue(24)}
                        height={RFValue(24)}
                    />)
                }
            </IconContainer>
            <Input
                ref={inputRef}
                autoCorrect={false}
                autoComplete="off"
                returnKeyType="send"
                onBlur={handleInputInBlur}
                onFocus={handleInputInFocus}
                placeholder="Buscar Pokémon"
                onChangeText={setPokemonName}
                onSubmitEditing={handleIndividualSearch}
                value={pokemonName}
                style={{
                    includeFontPadding: false
                }}
            />


            {
                resetSearch && !!pokemonName && (
                    <Button
                        onPress={handleResetSearch}

                    >
                        <IconContainer
                            style={{
                                backgroundColor: theme.colors.danger,
                            }}
                        >
                            <XCircle
                                width={24}
                                height={24}
                                strokeWidth={2}
                                stroke={theme.colors.shape}
                            />
                        </IconContainer>
                    </Button>
                )
            }

            <Button
                onPress={handleIndividualSearch}
            >
                <IconContainer>
                    <Search
                        width={24}
                        height={24}
                        strokeWidth={2}
                        stroke={theme.colors.danger}
                    />
                </IconContainer>
            </Button>
        </Container>
    );
}
