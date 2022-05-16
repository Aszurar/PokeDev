import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components/native';
import { ChevronsDown } from 'react-native-feather';
import {
    Container,
    ListContainer,
    LoadContainer,
    ModalContainer,
} from './styles';
import { MovesList } from '../MovesList';
import { MoveDetailsModal } from '../MoveDetailsModal';
import { HeaderModal } from '../HeaderModal';
import { RFValue } from 'react-native-responsive-fontsize';
import { PokeballLoad } from '../PokeballLoad';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IModal {
    onOpen: () => void;
    isVisible: boolean;
    onClose: () => void;
    isLoading: boolean;
    movesData?: {
        move: {
            name: string;
            url: string;
        }
    }[];
}

const defaultMovesData = [{
    move: {
        name: '',
        url: ''
    }
}]


export interface IMoveInfo {
    name: string;
    url: string;
}

const defaultMoveInfo: IMoveInfo = {
    name: "",
    url: "",
}

export function MovesModal({
    onClose,
    isVisible,
    isLoading,
    onOpen,
    movesData = defaultMovesData,
}: IModal) {

    const theme = useTheme();
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [moveInfo, setMoveInfo] = useState<IMoveInfo>(defaultMoveInfo);

    function handleOpenMoveDetailsModal() {
        setIsDetailsVisible(true);
    }
    function handleCloseMoveDetailsModal() {
        setIsDetailsVisible(false);
    }

    function handleSetMoveInfo(moveInfo: IMoveInfo) {
        setMoveInfo(moveInfo);
    }

    return (
        <Container>
            <Modal
                animationIn={"fadeInUpBig"}
                animationOut={"fadeOutDownBig"}
                animationInTiming={700}
                animationOutTiming={700}
                backdropColor={theme.colors.shape}
                isVisible={isVisible}
                hasBackdrop={false}
                swipeDirection={['down']}
                swipeThreshold={220}
                onSwipeComplete={onClose}
                onSwipeCancel={onOpen}
                useNativeDriverForBackdrop
                style={{ width: '100%', alignSelf: 'center', justifyContent: 'flex-end' }}
            >
                <ModalContainer>
                    <HeaderModal
                        onClose={onClose}
                        icon={ChevronsDown}
                        title={'Todos Movimentos'}
                        iconColor={theme.colors.shape}
                        titleColor={theme.colors.shape}
                        backgroundColor={theme.colors.danger}
                        borderColor={theme.colors.shape}
                    />

                    {!isLoading ? (
                        <ListContainer>
                            <MovesList
                                moves={movesData}
                                onDetailsOpen={handleOpenMoveDetailsModal}
                                handleSetMoveInfo={handleSetMoveInfo}
                            />
                        </ListContainer>
                    ) :
                        (
                            <LoadContainer>
                                <PokeballLoad
                                    width={RFValue(160)}
                                />
                            </LoadContainer>
                        )
                    }
                </ModalContainer>

            </Modal >

            <MoveDetailsModal
                moveInfo={moveInfo}
                isVisible={isDetailsVisible}
                onOpen={handleOpenMoveDetailsModal}
                onClose={handleCloseMoveDetailsModal}
            />

        </Container >
    );
}
