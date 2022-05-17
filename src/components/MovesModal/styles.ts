import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const ModalContainer = styled.View`
    width: 100%
    height: 65%;
    background-color: ${({ theme }) => theme.colors.danger};
`;

export const ListContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-self: center;
`;

export const LoadContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: ${RFValue(48)}px
`;
