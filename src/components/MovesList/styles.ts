import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


interface IMove {
    move: {
        name: string;
        url: string;
    }
}

export const List = styled(
    FlatList as new (props: FlatListProps<IMove>) => FlatList<IMove>)
.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const Separator = styled.View`
    height: ${RFValue(1)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.comp};
`;
