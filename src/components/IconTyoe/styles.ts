import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background-color: color;
    border-radius: ${RFValue(40)}px;
    align-items: center;
    justify-content: center;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
`;
