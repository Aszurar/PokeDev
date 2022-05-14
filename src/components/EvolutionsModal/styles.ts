import { BorderlessButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;


export const ModalContainer = styled.View`
    width: 90%;
    height: 80%;


    background-color: ${({ theme }) => theme.colors.shape};
    align-self: center;
    border-radius: ${RFValue(6)}px;
`;

export const HeadeContainer = styled.View`
`;


export const CloseButtonContainer = styled(GestureHandlerRootView)`
    position: absolute;
    z-index: 2;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    top: 0;
`;

export const CloseButton = styled(BorderlessButton)`
    align-items: center;
    justify-content: center;
    height: ${RFValue(36)}px;
    width: ${RFValue(36)}px;
    border-radius: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    align-self: center ;
`;
export const ListContainer = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 ${RFValue(16)}px;
    margin-top: ${RFValue(16)}px;
    justify-content: center;
    align-self: center;
`;
