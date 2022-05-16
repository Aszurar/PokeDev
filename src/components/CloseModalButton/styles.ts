import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const CloseButton = styled(BorderlessButton)`
    height: ${RFValue(36)}px;
    width: ${RFValue(42)}px;
    border-radius: ${RFValue(18)}px;

    align-items: center;
    justify-content: center;
`;
