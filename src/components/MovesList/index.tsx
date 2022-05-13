import React from 'react';
import { Card } from '../Card';

import {
    List,
    Separator
} from './styles';

interface IMoveList {
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[]
}
export function MovesList({ moves }: IMoveList) {
    return (
        <List
            data={moves}
            keyExtractor={({ move }) => String(move.url)}
            renderItem={({ item }) => {
                const { move } = item;
                return (
                    <Card
                        name={move.name}
                        moveList
                    />
                )
            }}
            ItemSeparatorComponent={() => <Separator />}
        />

    );
}
