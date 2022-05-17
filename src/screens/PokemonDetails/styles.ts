import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { setColorandIconByType } from '../../utils/setColorandIconByType';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Main = styled.View`
    padding: 0 ${RFValue(21)}px;
`;

export const CardInfoContainer = styled.View`
    width: 100%;
    flex-direction: row;
    height: ${RFValue(96)}px;

    margin-top: ${RFValue(31)}px;
    margin-bottom: ${RFValue(80)}px;
`;

export const ImageAndMeasureContainer = styled.View`
    width: ${RFValue(110)}px;
`;

export const ImageContainer = styled.View`
    height: 100%;
    width: ${RFValue(96)}px;
    justify-content: center;
    align-items: center;

    border-width: ${RFValue(1)}px;
    border-color: ${({ theme }) => theme.colors.medium};
    border-radius: ${RFValue(6)}px;
`;

export const PokemonImg = styled.Image`
    width: ${RFValue(96)}px;
    height: ${RFValue(96)}px;
`;

export const MeasurePokemonContainer = styled.View`
    width: 100%;
    flex-direction: row;

    margin-top: ${RFValue(4)}px;
    justify-content: space-between;
`;

export const InfoContainer = styled.View`
    flex: 1;
    margin-left: ${RFValue(13)}px;

    /* background-color: ${({ theme }) => theme.colors.secundary}; */
`;

export const FooterInfoContainer = styled.View`
    flex-direction: row;
    margin-top: ${RFValue(9)}px;
    justify-content: space-between;
`;

export const EvolutionsButtonContainer = styled.View`
    border-color: ${({ theme }) => theme.colors.danger};
    border-width: ${RFValue(2)}px;
    border-radius: ${RFValue(17)}px;
    height: ${RFValue(24)}px;
    width: ${RFValue(150)}px;
    align-self: center;
    margin-top: ${RFValue(24)}px;
    margin-bottom: ${RFValue(6)}px;
`;
export const EvolutionsButton = styled(BorderlessButton)`
    /* background-color: ${({ theme }) => theme.colors.danger}; */
    border-color: ${({ theme }) => theme.colors.danger};
    border-width: ${RFValue(2)}px;

    border-radius: ${RFValue(20)}px;
    justify-content: center;
    align-items: center;

    padding: 0 ${RFValue(10)}px;
`;

export const EvolutionsButtonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(10)}px;
    color: ${({ theme }) => theme.colors.danger};
    text-transform: uppercase;
`;

export const LabelContainer = styled.View`
    /* background-color: ${({ theme }) => theme.colors.danger}; */
`;


export const PokemonTypesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;


export const DescriptionContainer = styled.View`
    margin-bottom: ${RFValue(16)}px;
    margin-top: ${RFValue(30)}px;
`;


export const MovesButton = styled(RectButton)`
    width: 80%;
    background-color: ${({ theme }) => theme.colors.danger};
    border-radius: ${RFValue(16)}px;

    justify-content: center;
    align-items: center;
    align-self: center;

    margin-top: ${RFValue(16)}px;
    padding: ${RFValue(6)}px ${RFValue(20)}px;
`;

export const TextMovesButton = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.shape};
    /* text-transform: uppercase; */
`;
