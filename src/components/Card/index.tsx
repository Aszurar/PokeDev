import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'react-native-feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

import {
    Container,
    InfoContainer,
    Title
} from './styles';

interface ICard {
    name: string;
    moveList?: boolean;
}

export function Card({ name, moveList = false }: ICard) {
    const theme = useTheme();
    const navigation = useNavigation<any>();

    return (
        <Container>
            <InfoContainer
                onPress={() => moveList ? {} : navigation.navigate('PokemonDetails', { name })}
            >
                <Title>{capitalizeFirstLetter(name)}</Title>
                <ChevronRight
                    width={RFValue(24)}
                    height={RFValue(24)}
                    stroke={moveList ? theme.colors.danger : theme.colors.comp}
                    strokeWidth={2}
                />
            </InfoContainer>
        </Container>
    );
}
