import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const Title = styled.Text`
    margin: 0;
    padding: 0;
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.medium};
    font-family: ${({ theme }) => theme.fonts.regular};
`;
