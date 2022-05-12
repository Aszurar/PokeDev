import {RectButton} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    height: ${RFValue(40)}px;

    border-color: ${({ theme }) => theme.colors.danger};
    border-width: ${RFValue(1)}px;
    border-radius: ${RFValue(6)}px;

    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.light};
`;

export const Input = styled.TextInput`
    height: 100%;
    flex: 1;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.brand};
`;

export const SearchButton = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.light}
    border-radius: ${RFValue(6)}px;

`;

export const IconContainer = styled.View`
    height: 100%;
    width: ${RFValue(40)}px;

    justify-content: center;
    align-items: center;
`;
