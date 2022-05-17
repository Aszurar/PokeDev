import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


interface IPokemonInfoText {
    moves?: boolean;
    ability?: boolean;
    capitalize?: boolean;
    textFild?: "ability" | "type" | "moves" | "status" | "" | "pokemonName";
}

interface IInfoText extends IPokemonInfoText {
    wrap: boolean;
    typeColor?: string;
    rowDirection?: boolean;

};

export const Container = styled.View<IInfoText>`
    flex-direction: row;
    ${({ wrap }) => wrap && css`
        flex-wrap: wrap;
    `};
    ${({ rowDirection }) => rowDirection && css`
        margin-left: ${RFValue(6)}px;
    `};

    ${({ theme, textFild, typeColor }) => textFild === "type" &&
        css`
            color:${theme.colors.shape};
            background-color: ${typeColor};
            border-radius: ${RFValue(6)}px;
            /* margin-top: ${RFValue(2)}px;
            margin-right: ${RFValue(6)}px; */
            padding: 0 ${RFValue(8)}px;
    `};


    ${({ theme, textFild }) => textFild === "status" &&
        css`
            background-color: ${theme.colors.black};
            border-radius: ${RFValue(6)}px;
            padding: 0 ${RFValue(8)}px;

    `}

    ${({ textFild }) => textFild === "ability" && css`
        padding-right: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        border-right-width: ${RFValue(2)}px;
    `}

        ${({ textFild, theme }) => textFild === "moves" && css`
        border-radius: ${RFValue(6)}px;

        background-color: ${theme.colors.gray};
        margin-top: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        padding: 0 ${RFValue(12)}px;
    `}

`;


export const Title = styled.Text<IPokemonInfoText>`
    font-family: ${({ theme }) => theme.fonts.semi_bold};
    font-size: ${RFValue(14)}px;
    text-align: justify;
    color: ${({ theme }) => theme.colors.black};
    text-transform: ${({ capitalize }) => capitalize ? "capitalize" : "none"};


    ${({ theme, textFild }) => textFild === "pokemonName" && css`
        font-size: ${RFValue(24)}px;
        font-family: ${theme.fonts.extra_bold};
        text-transform: capitalize;
    `};

    ${({ theme, textFild }) => textFild === "type" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${theme.colors.shape};
            text-transform: uppercase;
    `}


    ${({ theme, textFild }) => textFild === "status" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${theme.colors.shape};
    `};

    ${({ textFild }) => textFild === "ability" && css`
        font-size: ${RFValue(16)}px;
        text-transform: capitalize;
    `}

        ${({ textFild, theme }) => textFild === "moves" && css`
        font-size: ${RFValue(16)}px;
        text-transform: capitalize;

        `}

`;
