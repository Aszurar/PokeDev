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

    margin-top: ${RFValue(31)}px;
`;

export const HeaderCardInfo = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

export const ImageContainer = styled.View`
    height: ${RFValue(96)}px;
    width: ${RFValue(110)}px;
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

export const InfoContainer = styled.View`
    flex: 1;
    margin-left: ${RFValue(13)}px;
`;
export const FooterInfoContainer = styled.View`
    flex-direction: row;
    margin-top: ${RFValue(9)}px;
    justify-content: space-between;
    align-items: center;
`;

export const IconTypeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: ${RFValue(110)}px;
`;
interface IBorderButton {
    color?: 'red' | 'blue';
}

export const BorderButtonContainer = styled.View<IBorderButton>`
    border-color: ${({ theme, color = "red" }) => color === 'red' ? theme.colors.danger : theme.colors.comp};
    border-width: ${RFValue(2)}px;
    border-radius: ${RFValue(17)}px;
    height: ${RFValue(24)}px;
    width: ${RFValue(150)}px;
    align-self: center;
`;
export const BorderButton = styled(BorderlessButton)`
    /* background-color: ${({ theme }) => theme.colors.danger}; */
    border-color: ${({ theme }) => theme.colors.danger};
    border-width: ${RFValue(2)}px;

    border-radius: ${RFValue(20)}px;
    justify-content: center;
    align-items: center;

    padding: 0 ${RFValue(10)}px;
`;

export const BorderButtonText = styled.Text<IBorderButton>`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(10)}px;
    color: ${({ theme, color = "red" }) => color === "blue" ? theme.colors.comp : theme.colors.danger};
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
    margin-top: ${RFValue(12)}px;
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
