import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { setBackGroundColorByType } from '../../utils/setBackGroundColorByType';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
`;



export const ErrorComponent = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const ErrorSearchContainer = styled.View`
    position: absolute;
    z-index: 1;
    top: ${RFValue(72)}px;
    padding: 0 ${RFValue(21)}px;

    align-self: center;
    justify-content: center;
    align-items: center;
`;

export const ErrorText = styled.Text`
    margin-top: ${RFValue(8)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.dark};
    text-align: center;

`;



export const Main = styled.View`
    padding: 0 ${RFValue(21)}px;
`;

export const CardInfoContainer = styled.View`
    width: 100%;
    flex-direction: row;
    height: ${RFValue(96)}px;

    margin-top: ${RFValue(31)}px;
    margin-bottom: ${RFValue(56)}px;
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
    border-color: ${({theme}) => theme.colors.medium};
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

export const LabelContainer = styled.View`
    /* background-color: ${({ theme }) => theme.colors.danger}; */
`;

export const LabelText = styled.Text`
    margin: 0;
    padding: 0;
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.medium};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PokemonName = styled.Text`
    margin: 0;
    padding: 0;
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.extra_bold};
`;


export const PokemonTypesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

interface IPokemonInfoText {
    pokemonTypes?: boolean;
    ability?: boolean;
    type?: string;
    moves?: boolean;
}

export const PokemonInfoText = styled.Text<IPokemonInfoText>`
    margin: 0;
    padding: 0;
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};

    ${({ pokemonTypes, theme, type='no' }) => pokemonTypes ? css`
        font-family: ${theme.fonts.bold};
        color:${setBackGroundColorByType(type!).textColor};
        background-color: ${setBackGroundColorByType(type!).color};
        border-radius: ${RFValue(6)}px;
        margin-top: ${RFValue(2)}px;
        margin-right: ${RFValue(6)}px;
        padding: 0 ${RFValue(8)}px;
    ` : css`
        font-family: ${theme.fonts.semi_bold};
    `}

    ${({ability }) => ability && css`
        font-size: ${RFValue(16)}px;
        padding-right: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        border-right-width: ${RFValue(2)}px;


        `}

        ${({moves, theme}) => moves && css`
        font-size: ${RFValue(16)}px;
        border-radius: ${RFValue(6)}px;

        background-color: ${theme.colors.gray};
        margin-top: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        padding-top: ${RFValue(6)}px;
        padding: 0 ${RFValue(12)}px;
    `}
`;

export const DescriptionContainer = styled.View`
    margin-bottom: ${RFValue(16)}px;
`;

export const AbilityContainer = styled.View`
    width: 100%;
    height: ${RFValue(79)}px;
    /* margin: ${RFValue(31)}px 0; */

    /* background-color: ${({theme}) => theme.colors.success}; */
`;

export const AbilityValuesContainer = styled.View`
    flex: 1;
    flex-direction: row;
`;

interface ITextValueLabel {
    isMovesText: boolean;
}

export const TextValueLabel = styled.Text`
    margin: 0;
    padding: 0;
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.semi_bold};

    `;

export const MovesContainer = styled.View`
    width: 100%;
    height: ${RFValue(240)}px;
    `;

export const MovesValuesContainer = styled.View`
    flex-direction: row;
`
