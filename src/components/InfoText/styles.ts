import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { setBackGroundColorByType } from '../../utils/setBackGroundColorByType';


interface IInfoText {
    wrap: boolean;
    rowDirection?: boolean;
};

export const Container = styled.View<IInfoText>`
    flex-direction: row;
    ${({ wrap }) => wrap && css`
        flex-wrap: wrap;
    `};
    ${({ rowDirection }) => rowDirection && css`
        margin-left: ${RFValue(6)}px;
    `}
`;

interface IPokemonInfoText {
    ability?: boolean;
    type?: string;
    moves?: boolean;
    textFild?: "ability" | "type" | "moves" | "status" | "";
}

export const Title = styled.Text<IPokemonInfoText>`
    margin: 0;
    padding: 0;
    align-items: center;
    /* justify-content: flex-end; */
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.black};

    ${({theme, type = "", textFild = "" }) => type !=="" && textFild === "type" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${setBackGroundColorByType(type).textColor};
            background-color: ${setBackGroundColorByType(type).color};
            border-radius: ${RFValue(6)}px;
            margin-top: ${RFValue(2)}px;
            margin-right: ${RFValue(6)}px;
            padding: 0 ${RFValue(8)}px;
            text-transform: uppercase;
    `}


    ${({theme, type = "", textFild = "" }) => type !=="" && textFild === "status" &&
        css`
            font-family: ${theme.fonts.bold};
            color:${theme.colors.shape};
            background-color: ${theme.colors.black};
            border-radius: ${RFValue(6)}px;
            padding: 0 ${RFValue(8)}px;
    `}
/*
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
    `} */
`;
