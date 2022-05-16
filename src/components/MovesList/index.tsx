import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Card } from '../Card';
import { IMoveInfo } from '../MovesModal';

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
    }[];
    onDetailsOpen: () => void;
    handleSetMoveInfo: (moveInfo: IMoveInfo) => void;
}
export function MovesList({ moves, onDetailsOpen, handleSetMoveInfo }: IMoveList) {
    const sortMoves = moves.sort((a, b) => a.move.name.localeCompare(b.move.name));
    return (
        <List
            data={sortMoves}
            keyExtractor={({ move }) => String(move.url)}
            renderItem={({ item }) => {
                const { move } = item;
                return (
                    <View
                        style={{ flex: 1 }}
                        onStartShouldSetResponder={() => true}
                    >
                        <GestureHandlerRootView>
                            <Card
                                name={move.name}
                                moveURL={move.url}
                                moveList
                                onDetailsOpen={onDetailsOpen}
                                handleSetMoveInfo={handleSetMoveInfo}
                            />
                        </GestureHandlerRootView>
                    </View>
                )
            }}
            ItemSeparatorComponent={() => <Separator />}
        />
    );
}
