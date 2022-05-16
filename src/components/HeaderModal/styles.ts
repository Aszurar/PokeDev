import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainer {
    backgroundColor: string;
    borderColor: string;
}

export const Container = styled.View<IContainer>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-bottom-color: ${({ borderColor }) => borderColor};
    border-bottom-width: ${RFValue(2)}px;
    border-style: dotted;
`;

export const TitleContainer = styled.View`
    height: ${RFValue(56)}px;
    justify-content: center;
    align-items: center;
`;

interface ITitle {
    titleColor: string;
}

export const Title = styled.Text<ITitle>`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    align-self: center ;
    color: ${({ titleColor }) => titleColor};
    text-transform: capitalize;
`;
