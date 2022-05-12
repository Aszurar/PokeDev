import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(56)}px;
`;

export const InfoContainer = styled(RectButton)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: ${RFValue(6)}px;
    background-color: ${({ theme }) => theme.colors.shape};

`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.semi_bold};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.dark};
`;
