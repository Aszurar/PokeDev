import { FlatList, FlatListProps } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IMyPokemonDetails } from '../../hooks/myPokemon';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.shape};
`;

export const Main = styled.View`
    margin-bottom: ${getBottomSpace()}px;
    padding: 0 ${RFValue(21)}px;
    padding-top: ${RFValue(8)}px;
`;

export const LoadingListContainer = styled.View`
height: 82%;
justify-content:center;
align-items: center;
`;

export const MyPokemonList = styled(
    FlatList as new (props: FlatListProps<IMyPokemonDetails>) => FlatList<IMyPokemonDetails>)
    .attrs({
        showsVerticalScrollIndicator: false,
    })``;

export const Separator = styled.View`
    height: ${RFValue(1)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.danger};
`;


export const Card = styled.View`
    height: ${RFValue(112)}px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    border-radius: ${RFValue(8)}px;
`;

export const CardInfo = styled.View`
    height: 100%;
`;

export const ImgContainer = styled.View`
    width: ${RFValue(96)}px;
    height: ${RFValue(96)}px;
    justify-content: center;
`;

export const PokemonImage = styled.Image`
    width: 80%;
    height: 80%;
`;

export const FooterInfo = styled.View`
    /* flex-direction: row; */
    /* height: 100%; */
    /* align-items: center; */
    /* background-color: yellow; */
`;

export const IconsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: ${RFValue(96)}px;
`;
