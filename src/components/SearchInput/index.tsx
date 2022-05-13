import React, { useState } from 'react';
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

interface ISeatchInput {
    name: string;
    isLoading: boolean;
    setName: (text: string) => void;
    onSubmit: (name: string) => void;
    individualSearch(): Promise<void>;
    generalSearch(): Promise<void>;

}

export function SearchInput({
    isLoading,
    name,
    setName,
    onSubmit,
    individualSearch,
    generalSearch
}: ISeatchInput) {
    const theme = useTheme();
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
        setName('');
        onSubmit('');

        await generalSearch();

        handleActivateResetButton();
        setIsResetSearch(false);

    }

    async function handleIndividualSearch() {
        try {
            onSubmit(name)
            await individualSearch();

        } catch (error) {
            console.log('Erro: ', error)
        } finally {
            handleActivateResetButton();
        }
    }

    return (
        <Container>
            <IconContainer>
                {(isInputInFocus || isLoading) ?
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
                autoCorrect={false}
                autoCompleteType="off"
                returnKeyType="send"
                onBlur={handleInputInBlur}
                onFocus={handleInputInFocus}
                placeholder="Buscar Pokémon"
                onChangeText={(text) => { setName(text) }}
                onSubmitEditing={handleIndividualSearch}
                value={name}
                style={{
                    includeFontPadding: false
                }}
            />


            {
                resetSearch && !!name && (
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
