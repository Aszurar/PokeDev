import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'react-native-feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import {
    Container,
    InfoContainer,
    Title
} from './styles';
import { IMoveInfo } from '../MovesModal';

interface ICard {
    name: string;
    moveURL?: string;
    moveList?: boolean;
    onDetailsOpen?(): void;
    handleSetMoveInfo?(moveInfo: IMoveInfo): void;
}

export function Card({
    name,
    moveURL = "",
    moveList = false,
    handleSetMoveInfo = () => { },
    onDetailsOpen = () => { }
}: ICard) {
    const theme = useTheme();
    const navigation = useNavigation<any>();

    function handleNavigateToMoveDetails() {
        onDetailsOpen();
        handleSetMoveInfo({ name, url: moveURL })
    }

    function handleNavigateToPokemonDetails() {
        navigation.navigate('PokemonDetails', { name })
    }

    return (
        <Container>

            <InfoContainer
                onPress={() => moveList ? handleNavigateToMoveDetails() : handleNavigateToPokemonDetails()}
                moveList={moveList}
            >
                <Title moveList={moveList}>{moveList ? name.replace('-', ' ') : name}</Title>
                <ChevronRight
                    width={RFValue(24)}
                    height={RFValue(24)}
                    stroke={moveList ? theme.colors.shape : theme.colors.black}
                    strokeWidth={2}
                />
            </InfoContainer>



            {/*

            {moveList ?
                <ModalButtonContainer
                    onPress={() => { onDetailsOpen(), handleSetMoveInfo({ name, url: moveURL }) }}
                ><>
                        <Title moveList={moveList}> {name.replace('-', ' ')}</Title>
                        <ChevronRight
                            width={RFValue(24)}
                            height={RFValue(24)}
                            stroke={theme.colors.black}
                            strokeWidth={2}
                        />
                    </>
                </ModalButtonContainer>
                :
                <InfoContainer
                    onPress={() => navigation.navigate('PokemonDetails', { name })}
                >
                    <Title>{name}</Title>
                    <ChevronRight
                        width={RFValue(24)}
                        height={RFValue(24)}
                        stroke={moveList ? theme.colors.danger : theme.colors.comp}
                        strokeWidth={2}
                    />
                </InfoContainer>
            } */}
        </Container >
    );
}
