import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


interface IPokemonInfoText {
    ability?: boolean;
    moves?: boolean;
    textFild?: "ability" | "type" | "moves" | "status" | "";
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

    ${({ theme, textFild = "", typeColor }) => textFild === "type" &&
        css`
            color:${theme.colors.shape};
            background-color: ${typeColor};
            border-radius: ${RFValue(6)}px;
            /* margin-top: ${RFValue(2)}px;
            margin-right: ${RFValue(6)}px; */
            padding: 0 ${RFValue(8)}px;
    `};


    ${({ theme, textFild = "" }) => textFild === "status" &&
        css`
            background-color: ${theme.colors.black};
            border-radius: ${RFValue(6)}px;
            padding: 0 ${RFValue(8)}px;

    `}
`;


export const Title = styled.Text<IPokemonInfoText>`
    font-size: ${RFValue(14)}px;
    text-align: justify;
    color: ${({ theme }) => theme.colors.black};

    ${({ theme, textFild = "" }) => textFild === "type" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${theme.colors.shape};
            text-transform: uppercase;
    `}


    ${({ theme, textFild = "" }) => textFild === "status" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${theme.colors.shape};
    `}
/*
    ${({ ability }) => ability && css`
        font-size: ${RFValue(16)}px;
        padding-right: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        border-right-width: ${RFValue(2)}px;


        `}

        ${({ moves, theme }) => moves && css`
        font-size: ${RFValue(16)}px;
        border-radius: ${RFValue(6)}px;

        background-color: ${theme.colors.gray};
        margin-top: ${RFValue(6)}px;
        margin-right: ${RFValue(6)}px;
        padding-top: ${RFValue(6)}px;
        padding: 0 ${RFValue(12)}px;
    `} */
`;
