import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IContainer{
    moveList: boolean;
}

export const Container = styled.View<IContainer>`
    width: 100%;
    background-color: ${({ theme, moveList }) => moveList ? theme.colors.comp : theme.colors.danger};
`;

export const HeaderContainer = styled.View`
    width: 100%;
    height: ${RFValue(58)}px;
    margin-top: ${getStatusBarHeight() + RFValue(12)}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;

`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.extra_bold};
    font-size: ${RFValue(17)}px;
    color: ${({ theme }) => theme.colors.light};
`;

export const StripeMoveModal = styled.View`
    position: absolute;
    top: -${RFValue(8)}px;
    height: ${RFValue(60)}px;
    width: ${RFValue(30)}px;
    border-radius: ${RFValue(30)}px;
    background-color: ${({ theme }) => theme.colors.danger};

`;

export const SubHeaderContainer = styled.View`
    width: 100%;
    height: ${RFValue(43)}px;
    background-color: ${({ theme }) => theme.colors.black};
    justify-content: center;
    align-items: center;
`;

export const SubHeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.light};
`;

export const BackButton = styled(BorderlessButton)`
    height: ${RFValue(24)}px;
    width: ${RFValue(24)}px;

    justify-content: center;
    align-items: center;

    position: absolute;
    left: ${RFValue(20)}px;
`;
