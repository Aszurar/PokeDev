import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card } from '../Card';

import {
    List, Separator
} from './styles';

interface IPokemonList {
    data: {
        name: string;
        url: string;
    }[]
}

export function PokemonList({ data }: IPokemonList) {
    return (
        <List
            data={data}
            keyExtractor={(item) => String(item.url)}
            renderItem={({ item }) => {
                const { name } = item;
                return (
                    <Card name={name} />
                )
            }}
            ItemSeparatorComponent={() => <Separator />}
        />

    );
}
