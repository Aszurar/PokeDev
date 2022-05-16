import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';



export const Container = styled.View`
    width: 100%;
    height: ${RFValue(56)}px;
`;

export const ModalButtonContainer = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.danger};
`;

export const InfoContainer = styled(RectButton)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: ${RFValue(6)}px;
    background-color: ${({ theme }) => theme.colors.shape};

`;

interface ITitle {
    moveList?: boolean;
}

export const Title = styled.Text<ITitle>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme, moveList = false }) => moveList ? theme.colors.shape : theme.colors.dark};
    text-transform:capitalize;
`;
