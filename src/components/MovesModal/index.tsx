import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { useTheme } from 'styled-components/native';
import { XCircle } from 'react-native-feather';
import {
    CloseButton,
    CloseButtonContainer,
    Container, HeadeContainer, ListContainer, ModalContainer, Title
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { MovesList } from '../MovesList';
import { Header } from '../Header';

interface IModal {
    isVisible: boolean;
    onClose: () => void;
    pokemonName: string;
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
    pokemonName,
    movesData = defaultMovesData,
}: IModal) {

    const theme = useTheme();

    return (
        <Container>
            <Modal
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}
                isVisible={isVisible}
                onBackdropPress={onClose}
                useNativeDriver
            >
                <ModalContainer>
                    <CloseButtonContainer>
                        <CloseButton onPress={onClose}>
                            <XCircle color={theme.colors.shape}
                                height={RFValue(24)}
                                width={RFValue(24)}
                            />
                        </CloseButton>
                    </CloseButtonContainer>
                    <HeadeContainer>
                        <Header
                            title={pokemonName}
                            subtitle="Todos os movimentos"
                            moveList
                            isLoading={isLoading}
                        />

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
