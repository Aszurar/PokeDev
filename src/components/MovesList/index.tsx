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
    //ordernar por ordem algabética
    return (
        <List
            data={moves}
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
                                url={move.url}
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
