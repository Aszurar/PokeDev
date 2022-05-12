import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


interface IPokemon {
    name: string;
    url: string;
}

export const List = styled(
    FlatList as new (props: FlatListProps<IPokemon>) => FlatList<IPokemon>)
.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const Separator = styled.View`
    height: ${RFValue(1)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.danger};
`;
