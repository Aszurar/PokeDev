import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


interface IContainer {
    home: boolean;
}

export const Container = styled.View<IContainer>`
    height: 100%;
    ${({ home }) => home && css`
        height: 73%;
    `};
    justify-content: flex-end;
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


