import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import PokeballIcon from '../../assets/icons/pokeball.svg';
import { Search } from 'react-native-feather';
import { useTheme } from 'styled-components/native';

import {
    Container,
    IconContainer,
    Input,
    SearchButton
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface ISeatchInput {
    name: string;
    isLoading: boolean;
    individualSearch(): Promise<void>;
    setName: (text: string) => void;
    onSubmit: (name: string) => void;

}

export function SearchInput({
    isLoading,
    name,
    setName,
    onSubmit,
    individualSearch
}: ISeatchInput) {
    const theme = useTheme();
    const [isInputInFocus, setIsInputInFocus] = useState(false);

    function handleInputInFocus() {
        setIsInputInFocus(true);
    }
    function handleInputInBlur() {
        setIsInputInFocus(false);
    }

    async function handleIndividualSearch() {
        try {
            onSubmit(name)
            await individualSearch();

        } catch (error) {
            console.log('Erro: ', error)
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
                style={{
                    includeFontPadding: false
                }}
            />


            <SearchButton
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
            </SearchButton>
        </Container>
    );
}
