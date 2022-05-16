import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
`;

export const ModalContainer = styled.View`
    width: 100%
    height: 55%;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFValue(6)}px;
`;
export const Main = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 ${RFValue(16)}px;
    margin-top: ${RFValue(16)}px;
    margin-bottom: ${getBottomSpace() + RFValue(16)}px;
`;

export const HeaderMain = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const FieldTextContainer = styled.View`
    margin-top: ${RFValue(16)}px;
`;
