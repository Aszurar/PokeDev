import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { PokemonDTO } from '../../dtos/PokemonDTO';
import { api } from '../../services/api';

import {
    CardInfoContainer,
    Container,
    DescriptionContainer,
    FooterInfoContainer,
    ImageContainer,
    InfoContainer,
    LabelContainer,
    Main,
    MovesButton,
    PokemonImg,
    PokemonTypesContainer,
    TextMovesButton,
    BorderButtonContainer,
    HeaderCardInfo,
    IconTypeContainer,
    BorderButton,
    BorderButtonText,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatMeasure } from '../../utils/formatMeasure';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { SpeciesDataDTO } from '../../dtos/SpeciesDataDTO';
import { setRarity } from '../../utils/setRarity';
import { XCircle } from 'react-native-feather';
import { MovesModal } from '../../components/MovesModal';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Loader } from '../../components/Loader';
import { FieldInfoText } from '../../components/FieldInfoText';
import { EvolutionDTO } from '../../dtos/EvolutionDTO';
import { EvolutionsModal } from '../../components/EvolutionsModal';
import { LabelText } from '../../components/LabelText';
import { InfoText } from '../../components/InfoText';
import { setColorandIconByType } from '../../utils/setColorandIconByType';
import { SvgProps } from 'react-native-svg';
import { IconTyoe } from '../../components/IconTyoe';
import { IPokemonDetails, useIndividualSearch } from '../../hooks/individualSearch';
import { useMyPokemon } from '../../hooks/myPokemon';
import theme from '../../global/styles/theme';
interface Params {
    name: string;
    url: string
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

export interface IMoves {
    move: {
        name: string;
        url: string;
    }
}

interface IIconType {
    icon: React.FC<SvgProps>;
    color: string;
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

const defaultMovesValue = [{
    move: {
        name: '',
        url: ''
    }
}]

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
    const { individualSearchProps } = useIndividualSearch();
    const { individualSearch } = individualSearchProps

    const { savePokemon } = useMyPokemon();

    const { name: pokemonName, url: detailsRoute } = route.params as Params;
    const [detailsData, setDetailsData] = useState<IPokemonDetails>({} as IPokemonDetails);
    const [speciesData, setSpeciesData] = useState<SpeciesDataDTO>({} as SpeciesDataDTO)
    const [describe, setDescribe] = useState<IDescribe>(defaultDescribeValue as IDescribe);
    const [moves, setMoves] = useState<IMoves[]>(defaultMovesValue as IMoves[])
    const [fourRandomMoves, setFourRandomMoves] = useState<IMoves[]>(defaultMovesValue as IMoves[]);
    // const [evolutionsData, setEvolutionsData] = useState(defaultEvolutionData as EvolutionDTO);


    const iconData: IIconType[] = []
    const [typeProps, setTypeProps] = useState<IIconType[]>(iconData as IIconType[]);
    const [isErrored, setisErrored] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isSpeciesDetailsLoading, setIsSpeciesDetailsLoading] = useState(true);
    // const [isEvolutionsDataLoading, setIsEvolutionsDataLoading] = useState(true);

    const [isSaveLoading, setIsSaveLoading] = useState(false);


    function selectFourRandomValuesofMoves(data: IMoves[]) {
        if (data.length > 0) {
            const randomMoves = data.sort(() => (0.5 - Math.random()))
            const fourRandomMoves = randomMoves.slice(0, 4);
            setFourRandomMoves(fourRandomMoves);
        } else {
            setFourRandomMoves(data);
        }
    }

    const [isMovesVisible, setIsMovesVisible] = useState(false);
    // const [isEvolutionVisible, setIsEvolutionVisible] = useState(false);

    function handleOpenMovesModal() {
        setIsMovesVisible(true);
    }

    function handleCloseModal() {
        setIsMovesVisible(false);
    }

    // Funcionalidade de evolu????o incompleta
    // function handleOpenEvolutionsModal() {
    //     setIsEvolutionVisible(true);
    // }
    // function handleCloseEvolutionsModal() {
    //     setIsEvolutionVisible(false);
    // }
    // Funcionalidade de Evolu????o n??o deu tempo para finalizar...
    // async function loadEvolutionsData() {
    //     setIsEvolutionsDataLoading(true);
    //     try {
    //         const evolutionWithID = speciesData.evolution_chain.url.split('v2/')[1];
    //         const response = await api.get(`${evolutionWithID}`);
    //         const data = response.data;
    //         setEvolutionsData(data);

    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setIsEvolutionsDataLoading(false);
    //     }
    // }


    async function loadPokemonSpecieDetails() {
        setisErrored(false);
        setIsSpeciesDetailsLoading(true);
        try {
            const specieRouteWithID = detailsData.species.url.split('v2/')[1];
            const response = await api.get(`${specieRouteWithID}`);
            const data = response.data as SpeciesDataDTO;
            setSpeciesData(data);

            setDescribe(data.flavor_text_entries.reverse()
                .find(({ language }) => language.name === 'en')!)
        } catch (err) {
            setisErrored(true);
            console.log(err);
        } finally {
            setIsSpeciesDetailsLoading(false);
        }
    }



    useEffect(() => {
        async function loadPokemonDetailsData() {
            setisErrored(false);
            setIsLoading(true);
            try {
                const detailsRouteWithID = detailsRoute.split('v2/')[1];
                const data = await individualSearch(detailsRouteWithID);
                setDetailsData(data);
                setMoves(data.moves);
                selectFourRandomValuesofMoves(data.moves);
            } catch (err) {
                console.log("loadPokemonDetailsData Error:", err);
                setisErrored(true);
            } finally {
                setIsLoading(false);

            }
        }

        loadPokemonDetailsData();

    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTypeProps(iconData);
            loadPokemonSpecieDetails();
            // loadEvolutionsData();
        }
    }, [isLoading])


    async function handleSavePokemon() {
        setIsSaveLoading(true);
        const pokemonTotalData = {
            detailsDataSaved: detailsData,
            speciesDataSaved: speciesData,
        }

        try {
            await savePokemon(pokemonTotalData);
            Alert.alert('Salvo com sucesso!');
        } catch (err) {
            console.log('Erro no salvamento', err);
            Alert.alert('Erro ao salvar!');
        } finally {
            setIsSaveLoading(false);
        }
    }

    return (
        <Container>
            <Header
                title='PokeDev'
                subtitle='Detalhes do Pok??mon'
                isBackButtonAvailable
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {isErrored ?
                    <ErrorComponent
                        title="Ocorreu um erro ao buscar o Pok??mon, por favor, volte e tente novamente."
                        icon={XCircle}
                    />
                    :
                    <Main>
                        <CardInfoContainer>
                            <HeaderCardInfo>
                                <ImageContainer>
                                    {isLoading ?
                                        (
                                            <Loader
                                                animationName='pokeball'
                                                width={RFValue(64)}
                                            />
                                        ) :
                                        (
                                            <PokemonImg
                                                source={{ uri: detailsData.sprites.front_default }}
                                            />
                                        )
                                    }
                                </ImageContainer>

                                <InfoContainer>
                                    <LabelContainer style={{ flexDirection: 'row' }}>
                                        <FieldInfoText
                                            label='Nome:'
                                            text={pokemonName.replace(/-/g, ' ')}
                                            isLoading={isLoading}
                                            textField="pokemonName"
                                            widthLoad={RFValue(160)}
                                        />

                                        <LabelContainer style={{ position: 'absolute', right: 0 }}>

                                            <FieldInfoText
                                                label='N??:'
                                                rowDirection
                                                isLoading={isSpeciesDetailsLoading}
                                                widthLoad={RFValue(18)}
                                                loadAnimaton="rectSkeleton"
                                                text={String(' ' + speciesData.id)}
                                            />

                                        </LabelContainer>
                                    </LabelContainer>

                                    <LabelContainer>
                                        <LabelText
                                            label='Tipo(s):'
                                        />

                                        {isLoading ?
                                            (
                                                <Loader
                                                    animationName='skeleton'
                                                    width={RFValue(70)}
                                                />
                                            ) :

                                            (
                                                <PokemonTypesContainer>
                                                    {
                                                        detailsData.types.map(({ type }, index) => {
                                                            const { color, icon } = setColorandIconByType(type.name);
                                                            iconData.push({ icon, color });
                                                            return (
                                                                <InfoText
                                                                    wrap
                                                                    key={index}
                                                                    rowDirection
                                                                    textFild='type'
                                                                    text={type.name}
                                                                    typeColor={color}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </PokemonTypesContainer>
                                            )
                                        }
                                    </LabelContainer>

                                </InfoContainer>
                            </HeaderCardInfo>

                            <FooterInfoContainer>
                                <FieldInfoText
                                    label='Peso:'
                                    isLoading={isLoading}
                                    widthLoad={RFValue(50)}
                                    text={formatMeasure(detailsData.weight, 'w')}

                                />
                                <FieldInfoText
                                    label='Altura:'
                                    isLoading={isLoading}
                                    widthLoad={RFValue(50)}
                                    text={formatMeasure(detailsData.height, 'h')}
                                />
                                <FieldInfoText
                                    label='Habitat:'
                                    capitalize
                                    widthLoad={RFValue(70)}
                                    isLoading={isSpeciesDetailsLoading}
                                    alignText={speciesData.habitat ? "flex-start" : "center"}
                                    text={speciesData.habitat ? speciesData.habitat.name : '-'}
                                />

                                <FieldInfoText
                                    label='Raridade:'
                                    capitalize
                                    widthLoad={RFValue(70)}
                                    isLoading={isSpeciesDetailsLoading}
                                    text={setRarity(speciesData)}
                                />

                            </FooterInfoContainer>

                            <FooterInfoContainer>

                                <IconTypeContainer>
                                    {
                                        isLoading ?
                                            <LabelContainer style={{ width: "100%", justifyContent: "center", alignItems: 'center' }}>
                                                <Loader
                                                    animationName='pokeball'
                                                    width={RFValue(40)}
                                                />

                                            </LabelContainer>
                                            :
                                            typeProps.map(({ icon: Icon, color }, index) => (
                                                <IconTyoe
                                                    key={index}
                                                    icon={Icon}
                                                    backgroundColor={color}
                                                />
                                            ))
                                    }
                                </IconTypeContainer>

                                <LabelContainer>

                                    {(!isLoading && !isSpeciesDetailsLoading) && (
                                        <BorderButtonContainer
                                            color='blue'
                                        >
                                            {!isSaveLoading ?
                                                <BorderButton
                                                    onPress={handleSavePokemon}
                                                >
                                                    <BorderButtonText
                                                        style={{
                                                            includeFontPadding: false,
                                                        }}
                                                        color="blue"
                                                    >
                                                        Salvar
                                                    </BorderButtonText>
                                                </BorderButton>
                                                :
                                                <ActivityIndicator
                                                    color={theme.colors.comp}
                                                    size='small'
                                                />
                                            }
                                        </BorderButtonContainer>
                                    )
                                    }
                                    <BorderButtonContainer
                                        style={{ marginTop: RFValue(12) }}
                                    >
                                        <BorderButton
                                            onPress={() => { }}
                                        >
                                            <BorderButtonText
                                                style={{
                                                    includeFontPadding: false,
                                                }}
                                            >
                                                Evolu????es
                                            </BorderButtonText>
                                        </BorderButton>
                                    </BorderButtonContainer>
                                </LabelContainer>

                            </FooterInfoContainer>
                        </CardInfoContainer>


                        <DescriptionContainer>
                            <FieldInfoText
                                label='Descri????o:'
                                isLoading={isSpeciesDetailsLoading}
                                widthLoad={RFValue(300)}
                                text={describe.flavor_text.replace(/\n/g, ' ')}
                            />
                        </DescriptionContainer>

                        <LabelContainer style={{ marginBottom: RFValue(12) }}>
                            <LabelText
                                label='Habilidades:'
                            />
                            {isLoading ?
                                (
                                    <Loader
                                        animationName='skeleton'
                                        width={RFValue(100)}
                                    />
                                ) :

                                (
                                    <PokemonTypesContainer>
                                        {
                                            detailsData.abilities.map(({ ability }, index) => {
                                                return (
                                                    <InfoText
                                                        wrap
                                                        key={index}
                                                        rowDirection
                                                        textFild='ability'
                                                        text={ability.name}
                                                    />
                                                )
                                            })
                                        }
                                    </PokemonTypesContainer>
                                )
                            }
                        </LabelContainer>



                        <LabelContainer style={{ marginBottom: RFValue(12) }}>
                            <LabelText
                                label='Movimentos:'
                            />
                            {isLoading ?
                                (
                                    <Loader
                                        animationName='skeleton'
                                        width={RFValue(140)}
                                    />
                                ) :

                                (
                                    <PokemonTypesContainer>
                                        {
                                            fourRandomMoves.map(({ move }, index) => {
                                                return (
                                                    <InfoText
                                                        wrap
                                                        key={index}
                                                        rowDirection
                                                        textFild='moves'
                                                        text={move.name}
                                                    />
                                                )
                                            })
                                        }
                                        {detailsData.moves.length > 4 &&
                                            (<InfoText
                                                wrap
                                                rowDirection
                                                textFild='moves'
                                                text="..."
                                            />)
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
                                    (
                                        <View style={{ alignItems: 'center' }}>
                                            <Loader
                                                animationName='skeleton'
                                                width={RFValue(150)}
                                            />
                                        </View>
                                    )
                            }

                        </LabelContainer>
                    </Main>
                }
                {
                    !isLoading && (
                        <MovesModal
                            onOpen={handleOpenMovesModal}
                            movesData={moves}
                            isLoading={isLoading}
                            isVisible={isMovesVisible}
                            onClose={handleCloseModal}
                        />
                    )
                }


                {/*
                funcionalidade de evolu????o incompleta
                {!isEvolutionsDataLoading && (
                <EvolutionsModal
                    pokemonName={detailsData.name}
                    isLoading={isLoading}
                    evolutionData={evolutionsData}
                    isEvolutionLoading={isEvolutionsDataLoading}
                    isVisible={isEvolutionVisible}
                    onClose={handleCloseEvolutionsModal}
                />)
            } */}
            </ScrollView >
        </Container >
    );
}
