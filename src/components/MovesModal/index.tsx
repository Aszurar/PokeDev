import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { useTheme } from 'styled-components/native';
import { ChevronsDown, XCircle } from 'react-native-feather';
import {
    CloseButton,
    CloseButtonContainer,
    Container, HeadeContainer, ListContainer, ModalContainer, Title
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { MovesList } from '../MovesList';
import { Header } from '../Header';

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
export function MovesModal({
    onClose,
    isVisible,
    isLoading,
    onOpen,
    movesData = defaultMovesData,
}: IModal) {

    const theme = useTheme();

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

                    <CloseButtonContainer
                    >
                        <CloseButton onPress={onClose}>
                            <ChevronsDown color={theme.colors.shape}
                                height={RFValue(36)}
                                width={RFValue(36)}
                            />
                        </CloseButton>
                    </CloseButtonContainer>


                    <CloseButtonContainer
                        side="left"
                    >
                        <CloseButton onPress={onClose}>
                            <ChevronsDown color={theme.colors.shape}
                                height={RFValue(36)}
                                width={RFValue(36)}
                            />
                        </CloseButton>
                    </CloseButtonContainer>

                    <HeadeContainer>
                        <Title>Todos Movimentos</Title>
                    </HeadeContainer>

                    {!isLoading ? (
                        <ListContainer>
                            <MovesList
                                moves={movesData}
                            />
                        </ListContainer>
                    ) :
                        (
                            <LottieView
                                source={pokeballAnimation}
                                style={{ height: '50%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                                resizeMode="contain"
                                autoPlay
                                loop
                            />
                        )
                    }
                </ModalContainer>

            </Modal>
        </Container >
    );
}
