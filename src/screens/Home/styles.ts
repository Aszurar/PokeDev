import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;


export const SearchContainer = styled.View`
    flex-direction: row;

    height: ${RFValue(48)}px;
    width: 100%;

    margin: ${RFValue(8)}px 0;
    padding: 0 ${RFValue(21)}px;
    justify-content: space-between;
    align-items: center;

    /* background-color: ${({ theme }) => theme.colors.primary}; */
`;


export const TotalPokemonContainer = styled.View`
    height: ${RFValue(40)}px;
    width: ${RFValue(48)}px;
    margin-left: ${RFValue(16)}px;
    border-radius: ${RFValue(6)}px;
    background-color: ${({ theme }) => theme.colors.danger};

    align-items: center;
    justify-content: center;
`;

export const TotalPokemonText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.light};
`;

export const PokemonListContainer = styled.View`
    flex: 1;
    margin-bottom: ${getBottomSpace()}px;
    padding: 0 ${RFValue(21)}px;
`;

export const LoadingListContainer = styled.View`
    height: 100%;
    justify-content:center;
    align-items: center;
`;

export const CardContainer = styled.View`
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.danger};
`;
