import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import skeletonTextAnimation from '../../assets/skeleton.json';
import skeletonAnimation from '../../assets/skeletonImage.json';
import pokeballAnimation from '../../assets/pokeball.json';
import digletAnimation from '../../assets/diglet.json';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import { api } from '../../services/api';

import {
    CardInfoContainer,
    Container,
    ImageContainer,
    InfoContainer,
    Main,
    LabelContainer,
    LabelText,
    PokemonImg,
    PokemonName,
    PokemonInfoText,
    MeasurePokemonContainer,
    ImageAndMeasureContainer,
    PokemonTypesContainer,
    DescriptionContainer,
    FooterInfoContainer,
    ErrorComponent,
    ErrorSearchContainer,
    ErrorText,
    MovesButton,
    TextMovesButton,
    EvolutionsButton,
    EvolutionsButtonText,
    EvolutionsButtonContainer
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatMeasure } from '../../utils/formatMeasure';
import { ScrollView, View } from 'react-native';
import { SpeciesDataDTO } from '../../dtos/SpeciesDataDTO';
import { setRarity } from '../../utils/setRarity';
import { XCircle } from 'react-native-feather';
import { useTheme } from 'styled-components/native';
import { MovesModal } from '../../components/MovesModal';
import { EvolutionDTO } from '../../dtos/EvolutionDTO';
import { EvolutionsModal } from '../../components/EvolutionsModal';
interface Params {
    name: string;
}
interface IDescribe {
    flavor_text: string;
    language: {
        name: string;
    };
    version: {
        name: string;
    }
}


const defaultDescribeValue = {
    flavor_text: '',
    language: {
        name: '',
    },
    version: {
        name: '',
    }
}

const defaultEvolutionData = {
    chain: {
        evolves_to: [{
            evolves_to: [
                {
                    species: {
                        name: '',
                    }
                }
            ],
            species: {
                name: '',
            }
        }
        ],
        species: {
            name: '',
        }
    }
}


export function PokemonDetails() {
    const route = useRoute();
    const theme = useTheme();

    const { name } = route.params as Params;
    const [detailsData, setDetailsData] = useState<PokemonDTO>({} as PokemonDTO);
    const [speciesData, setSpeciesData] = useState<SpeciesDataDTO>({} as SpeciesDataDTO)
    const [describe, setDescribe] = useState<IDescribe>(defaultDescribeValue as IDescribe);
    const [evolutionsData, setEvolutionsData] = useState(defaultEvolutionData as EvolutionDTO);

    const [isErrored, setisErrored] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isSpeciesDetailsLoading, setIsSpeciesDetailsLoading] = useState(true);
    const [isEvolutionsDataLoading, setIsEvolutionsDataLoading] = useState(true);


    const [isMovesVisible, setIsMovesVisible] = useState(false);
    const [isEvolutionVisible, setIsEvolutionVisible] = useState(false);

    function handleOpenMovesModal() {
        setIsMovesVisible(true);
    }

    function handleCloseModal() {
        setIsMovesVisible(false);
    }
    function handleOpenEvolutionsModal() {
        setIsEvolutionVisible(true);
    }
    function handleCloseEvolutionsModal() {
        setIsEvolutionVisible(false);
    }


    async function loadPokemonSpecieDetails() {
        setIsSpeciesDetailsLoading(true);
        try {
            const pokemonID = detailsData.species.url.split('/')[6];
            console.log("==========>", pokemonID);
            const response = await api.get(`/pokemon-species/${pokemonID}`);
            const data = response.data as SpeciesDataDTO;
            setSpeciesData(data);

            setDescribe(data.flavor_text_entries.find(({ language }) => language.name === 'en')!)
            setisErrored(false);
        } catch (err) {
            setisErrored(true);
            console.log(err);
        } finally {
            setIsSpeciesDetailsLoading(false);
        }
    }
    async function loadEvolutionsData() {
        setIsEvolutionsDataLoading(true);
        try {
            const evolutionID = speciesData.evolution_chain.url.split('/')[6];
            console.log("==========>", evolutionID);
            const response = await api.get(`/evolution-chain/${evolutionID}`);
            const data = response.data;
            setEvolutionsData(data);

        } catch (err) {
            console.log(err);
        } finally {
            setIsEvolutionsDataLoading(false);
            // if (!isEvolutionsDataLoading) {

            //     console.log("==========>", evolutionsData);

            //     evolutionsData.chain.evolves_to.map(({ species, evolves_to }) => {
            //         console.log("==========>", species.name);
            //         evolves_to.map(({ species }) => {
            //             console.log("====evolucao2======>", species.name);
            //         }
            //         )
            //     })
            // }

        }
    }

    useEffect(() => {
        async function loadPokemonDetailsData() {
            setIsLoading(true);
            try {
                const response = await api.get(`/pokemon/${name}`);
                const data = response.data;
                setDetailsData(data);

            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);

            }
        }

        loadPokemonDetailsData();

    }, []);

    useEffect(() => {
        if (!isLoading) {
            loadPokemonSpecieDetails();
            loadEvolutionsData();
        }
    }, [isLoading])

    return (
        <Container>
            <Header
                title='PokeDev'
                subtitle='Detalhes do Pokémon'
                isBackButtonAvailable
            />

            {isErrored ?
                (
                    <ErrorComponent>
                        <ErrorSearchContainer>
                            <XCircle
                                width={RFValue(100)}
                                height={RFValue(100)}
                                color={theme.colors.dark}
                                strokeWidth={2}
                            />
                            <ErrorText>
                                Ocorreu um erro ao buscar o Pokémon, por favor, volte e tente novamente.
                            </ErrorText>
                        </ErrorSearchContainer>
                        <LottieView
                            source={digletAnimation}
                            style={{ width: '100%', top: RFValue(29) }}
                            resizeMode="contain"
                            autoPlay
                            loop
                        />
                    </ErrorComponent>
                )
                :
                (
                    <Main>
                        {/* <ScrollView> */}
                        <CardInfoContainer>
                            <ImageAndMeasureContainer>
                                <ImageContainer>
                                    {isLoading ?
                                        (
                                            <LottieView
                                                source={pokeballAnimation}
                                                style={{ height: RFValue(64), width: RFValue(64) }}
                                                resizeMode="contain"
                                                autoPlay
                                                loop
                                            />
                                        ) :
                                        (
                                            <PokemonImg
                                                source={{ uri: detailsData.sprites.front_default }}
                                            />
                                        )
                                    }
                                </ImageContainer>

                                <MeasurePokemonContainer>
                                    <LabelContainer>
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}
                                        >Peso:</LabelText>
                                        {isLoading ?
                                            (
                                                <LottieView
                                                    source={skeletonTextAnimation}
                                                    style={{ height: RFValue(18) }}
                                                    resizeMode="contain"
                                                    autoPlay
                                                    loop
                                                />
                                            ) :
                                            (
                                                <PokemonInfoText
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                    pokemonTypes={false}
                                                >
                                                    {formatMeasure(detailsData.weight, 'w')}
                                                </PokemonInfoText>
                                            )}
                                    </LabelContainer>

                                    <LabelContainer>
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}
                                        >Altura:</LabelText>
                                        {isLoading ?
                                            (
                                                <LottieView
                                                    source={skeletonTextAnimation}
                                                    style={{ height: RFValue(18) }}
                                                    resizeMode="contain"
                                                    autoPlay
                                                    loop
                                                />
                                            ) :
                                            (
                                                <PokemonInfoText
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                >
                                                    {formatMeasure(detailsData.height, 'h')}
                                                </PokemonInfoText>
                                            )}
                                    </LabelContainer>
                                </MeasurePokemonContainer>
                            </ImageAndMeasureContainer>


                            <InfoContainer>
                                <View style={{ flexDirection: 'row' }}>
                                    <LabelContainer>
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}

                                        >Nome:</LabelText>
                                        {isLoading ?
                                            (
                                                <LottieView
                                                    source={skeletonTextAnimation}
                                                    style={{ height: RFValue(42) }}
                                                    resizeMode="contain"
                                                    autoPlay
                                                    loop
                                                />
                                            ) :
                                            (
                                                <PokemonName
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                >
                                                    {detailsData.name}
                                                </PokemonName>
                                            )}
                                    </LabelContainer>

                                    <LabelContainer style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}

                                        >Nº:</LabelText>
                                        {isSpeciesDetailsLoading ?
                                            (
                                                <View style={{ borderRadius: RFValue(16) }}>
                                                    <LottieView
                                                        source={skeletonAnimation}
                                                        style={{ left: RFValue(3), height: RFValue(18), }}
                                                        resizeMode="contain"
                                                        autoPlay
                                                        loop
                                                    />
                                                </View>
                                            ) :
                                            (
                                                <PokemonInfoText
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                >
                                                    {String(' ' + speciesData.id)}
                                                </PokemonInfoText>
                                            )}
                                    </LabelContainer>
                                </View>

                                <LabelContainer>
                                    <LabelText
                                        style={{
                                            includeFontPadding: false,
                                        }}
                                    >Tipo:</LabelText>
                                    {isLoading ?
                                        (
                                            <LottieView
                                                source={skeletonTextAnimation}
                                                style={{ width: '50%' }}
                                                resizeMode="contain"
                                                autoPlay
                                                loop
                                            />
                                        ) :

                                        (
                                            <PokemonTypesContainer>
                                                {
                                                    detailsData.types.map(({ type }, index) => (
                                                        <PokemonInfoText
                                                            key={index}
                                                            style={{
                                                                includeFontPadding: false,
                                                            }}
                                                            pokemonTypes
                                                            type={type.name}
                                                        >
                                                            {type.name.toUpperCase()}
                                                        </PokemonInfoText>
                                                    ))
                                                }
                                            </PokemonTypesContainer>
                                        )
                                    }
                                </LabelContainer>

                                <FooterInfoContainer>
                                    <LabelContainer >
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}
                                        >Habitat:</LabelText>
                                        {isSpeciesDetailsLoading ?
                                            (
                                                <LottieView
                                                    source={skeletonTextAnimation}
                                                    style={{ width: '50%' }}
                                                    resizeMode="contain"
                                                    autoPlay
                                                    loop
                                                />
                                            ) :

                                            (
                                                <PokemonTypesContainer>
                                                    <PokemonInfoText
                                                        style={{
                                                            includeFontPadding: false,
                                                        }}
                                                    >
                                                        {speciesData.habitat ? speciesData.habitat.name : ''}
                                                    </PokemonInfoText>
                                                </PokemonTypesContainer>
                                            )
                                        }
                                    </LabelContainer>

                                    <LabelContainer>
                                        <LabelText
                                            style={{
                                                includeFontPadding: false,
                                            }}
                                        >Raridade:</LabelText>
                                        {isSpeciesDetailsLoading ?
                                            (
                                                <LottieView
                                                    source={skeletonTextAnimation}
                                                    style={{ width: '50%' }}
                                                    resizeMode="contain"
                                                    autoPlay
                                                    loop
                                                />
                                            ) :

                                            (
                                                <PokemonTypesContainer>
                                                    <PokemonInfoText
                                                        style={{
                                                            includeFontPadding: false,
                                                        }}
                                                    >
                                                        {setRarity(speciesData)}
                                                    </PokemonInfoText>
                                                </PokemonTypesContainer>
                                            )
                                        }
                                    </LabelContainer>
                                </FooterInfoContainer>

                                {!isEvolutionsDataLoading &&
                                    (
                                        <EvolutionsButtonContainer>
                                            <EvolutionsButton
                                                onPress={handleOpenEvolutionsModal}
                                            >
                                                <EvolutionsButtonText
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                >
                                                    Evoluções
                                                </EvolutionsButtonText>
                                            </EvolutionsButton>
                                        </EvolutionsButtonContainer>

                                    )

                                }
                            </InfoContainer>
                        </CardInfoContainer>


                        <DescriptionContainer>
                            <LabelContainer>
                                <LabelText
                                    style={{
                                        includeFontPadding: false,
                                    }}
                                >Descrição:</LabelText>
                                {isSpeciesDetailsLoading ?
                                    (
                                        <LottieView
                                            source={skeletonTextAnimation}
                                            style={{ width: '80%' }}
                                            resizeMode="contain"
                                            autoPlay
                                            loop
                                        />
                                    ) :

                                    (
                                        <PokemonTypesContainer>
                                            <PokemonInfoText
                                                style={{
                                                    includeFontPadding: false,
                                                }}
                                            >
                                                {describe.flavor_text.replace(/\n/g, ' ')}
                                            </PokemonInfoText>
                                        </PokemonTypesContainer>
                                    )
                                }
                            </LabelContainer>
                        </DescriptionContainer>

                        <LabelContainer style={{ marginBottom: RFValue(31) }}>
                            <LabelText
                                style={{
                                    includeFontPadding: false,
                                }}
                            >Habilidades:</LabelText>
                            {isLoading ?
                                (
                                    <LottieView
                                        source={skeletonTextAnimation}
                                        style={{ width: '60%' }}
                                        resizeMode="contain"
                                        autoPlay
                                        loop
                                    />
                                ) :

                                (
                                    <PokemonTypesContainer>
                                        {
                                            detailsData.abilities.map(({ ability }, index) => (
                                                <PokemonInfoText
                                                    key={index}
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                    ability
                                                >
                                                    {(ability.name)}
                                                </PokemonInfoText>
                                            ))
                                        }
                                    </PokemonTypesContainer>
                                )
                            }
                        </LabelContainer>



                        <LabelContainer style={{ marginBottom: RFValue(31) }}>
                            <LabelText
                                style={{
                                    includeFontPadding: false,
                                }}
                            >Movimentos:</LabelText>
                            {isLoading ?
                                (
                                    <LottieView
                                        source={skeletonTextAnimation}
                                        style={{ width: '60%' }}
                                        resizeMode="contain"
                                        autoPlay
                                        loop
                                    />
                                ) :

                                (
                                    <PokemonTypesContainer>
                                        {
                                            detailsData.moves.slice(0, 4).map(({ move }, index) => (
                                                <PokemonInfoText
                                                    key={index}
                                                    style={{
                                                        includeFontPadding: false,
                                                    }}
                                                    moves
                                                >
                                                    {(move.name)}
                                                </PokemonInfoText>
                                            ))
                                        }
                                        {detailsData.moves.length > 4 &&
                                            (<PokemonInfoText moves>...</PokemonInfoText>)
                                        }

                                    </PokemonTypesContainer>
                                )


                            }
                            {

                                !isLoading ?
                                    detailsData.moves.length > 4 && (
                                        <MovesButton
                                            onPress={handleOpenMovesModal}
                                        >
                                            <TextMovesButton
                                                style={{
                                                    includeFontPadding: false,
                                                }}
                                            >
                                                Ver todos os movimentos
                                            </TextMovesButton>
                                        </MovesButton>
                                    )
                                    :
                                    (<LottieView
                                        source={skeletonTextAnimation}
                                        style={{ width: '60%', alignSelf: 'center' }}
                                        resizeMode="contain"
                                        autoPlay
                                        loop
                                    />)
                            }

                        </LabelContainer>

                        {/* </ScrollView> */}

                    </Main>
                )
            }

            <MovesModal
                onOpen={handleOpenMovesModal}
                movesData={detailsData.moves}
                isLoading={isLoading}
                isVisible={isMovesVisible}
                onClose={handleCloseModal}
            />


            {!isEvolutionsDataLoading && (
                <EvolutionsModal
                    pokemonName={detailsData.name}
                    isLoading={isLoading}
                    evolutionData={evolutionsData}
                    isEvolutionLoading={isEvolutionsDataLoading}
                    isVisible={isEvolutionVisible}
                    onClose={handleCloseEvolutionsModal}
                />)
            }
        </Container >
    );
}
