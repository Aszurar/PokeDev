import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { useTheme } from 'styled-components/native';
import { XCircle } from 'react-native-feather';
import {
    CloseButton,
    CloseButtonContainer,
    Container,
    HeadeContainer,
    ListContainer,
    ModalContainer
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../Header';
import { EvolutionDTO } from '../../dtos/EvolutionDTO';

interface IModal {
    isVisible: boolean;
    onClose: () => void;
    pokemonName: string;
    isLoading: boolean;
    isEvolutionLoading: boolean;
    evolutionData: EvolutionDTO;
}


export function EvolutionsModal({
    onClose,
    isVisible,
    isLoading,
    pokemonName,
    evolutionData,
    isEvolutionLoading
}: IModal) {

    const theme = useTheme();
    console.log("==========> Evolution Modal Load:", isEvolutionLoading)
    // console.log("==========> evolutionData:", evolutionData)

    if (!isEvolutionLoading && !isLoading) {
        console.log('No modal nome:======>', evolutionData.chain.species.name);
        evolutionData.chain.evolves_to.map((evolution) => {
            console.log('No modal ======>', evolution.species.name);

        });
    }


    return (
        <Container>
            <Modal
                animationIn={"bounceInRight"}
                animationOut={"bounceOutRight"}
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
                            subtitle="Evoluções"
                            isLoading={isLoading}
                        />

                    </HeadeContainer>



                    {/* !isEvolutionLoading ? (
                        <ListContainer>
                            {
                                evolutionData.chain.evolves_to.map((evolution, index) => (
                                    <>
                                        <Header
                                            key={evolution.species.name}
                                            title={evolution.species.name}
                                            subtitle={`${index + 1}º`}
                                            moveList
                                            isLoading={isEvolutionLoading}
                                        />
                                        {{
                                            evolution.evolves_to.map((evolution, index) => (
                                                <Header
                                                    key={evolution.species.name}
                                                    title={evolution.species.name}
                                                    subtitle={`${index + 1}º`}
                                                    moveList
                                                    isLoading={isLoading}
                                                />
                                            ))

                                        } }
                                    </>
                                ))
                            }
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
                    */}
                </ModalContainer>

            </Modal>
        </Container >
    );
}
