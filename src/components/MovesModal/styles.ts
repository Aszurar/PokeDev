import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
`;


export const ModalContainer = styled.View`
    width: 100%
    height: 65%;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFValue(6)}px;
`;

export const HeadeContainer = styled.View`
    width: 100%;
    height: ${RFValue(43)}px;
    background-color: ${({ theme }) => theme.colors.danger};
    /* border-width: ${RFValue(2)}px; */
    /* border-color: ${({ theme }) => theme.colors.danger}; */
    justify-content: center;
    align-items: center;
`;

interface ICloseModal {
    side?: 'left' | 'right';
}

export const CloseButtonContainer = styled(GestureHandlerRootView)<ICloseModal>`
    position: absolute;
    z-index: 2;
    flex-direction: row;
    ${({ side ='right' }) => side === 'right' && css`
        right: 0;
    `}
    top: ${RFValue(4)}px;
`;

export const CloseButton = styled(RectButton)`
    align-items: center;
    justify-content: center;
    height: ${RFValue(36)}px;
    width: ${RFValue(42)}px;
    border-radius: ${RFValue(18)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    align-self: center ;
    color: ${({ theme }) => theme.colors.shape};
`;
export const ListContainer = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 ${RFValue(16)}px;
    margin-top: ${RFValue(16)}px;
    justify-content: center;
    align-self: center;
`;
