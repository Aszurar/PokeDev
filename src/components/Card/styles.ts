import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
    width: 100%;
    height: ${RFValue(56)}px;
`;
interface IInfo {
    moveList: boolean;
}

export const InfoContainer = styled(RectButton) <IInfo>`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: ${RFValue(6)}px;
    background-color: ${({ theme, moveList }) => moveList ? theme.colors.danger : theme.colors.shape};

`;

export const Title = styled.Text<IInfo>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme, moveList = false }) => moveList ? theme.colors.shape : theme.colors.dark};
    text-transform:capitalize;
`;
