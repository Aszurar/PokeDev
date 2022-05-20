import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Search } from 'react-native-feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Header } from '../../components/Header';
import { IconTyoe } from '../../components/IconTyoe';
import { InfoText } from '../../components/InfoText';
import { Loader } from '../../components/Loader';
import { IMyPokemonDetails, useMyPokemon } from '../../hooks/myPokemon';
import { setColorandIconByType } from '../../utils/setColorandIconByType';
import { setRarity } from '../../utils/setRarity';

import {
    Card,
    CardInfo,
    Container,
    FooterInfo,
    IconsContainer,
    ImgContainer,
    LoadingListContainer,
    Main,
    MyPokemonList,
    PokemonImage,
    Separator,
} from './styles';

interface IIconTypes {
    type: {
        name: string;
        url: string;
    }
}

interface IIconProps {
    icon: React.FC<SvgProps>;
    color: string;
}

export function MyPokemon() {
    const { getAllMyPokemon } = useMyPokemon();
    const [myPokemon, setMyPokemon] = useState<IMyPokemonDetails[]>([] as IMyPokemonDetails[]);
    const [typeProps, setTypeProps] = useState<IIconProps[]>([] as IIconProps[]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function getIconTypes(allTypes: IIconTypes[]) {
        const iconData: IIconProps[] = [];
        allTypes.map(({ type }, index) => {
            iconData.push(setColorandIconByType(type.name))
        })
        return iconData;
    }

    useEffect(() => {
        Alert.alert("Página ainda em desenvolvimento!",
            "Medidas serão alteradas, ainda não é possível usar o scroll!.")
        async function getMyPokemon() {
            setError(false);
            setLoading(true);
            try {
                const response = await getAllMyPokemon();
                setMyPokemon(response);
            } catch (error) {
                console.log('Error ao carregar seus pokémon', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getMyPokemon();
    }, [])


    return (
        <Container>
            <Header
                title='Mochila'
                subtitle='Meus Pokemon'
                isBackButtonAvailable
            />

            {error ? (

                <ErrorComponent
                    title='Ocorreu um erro ao buscar o Pokémon, verifique se o nome está correto e tente novamente'
                    icon={Search}
                    home
                />
            ) : (
                <Main>
                    {(loading) ? (
                        <LoadingListContainer>
                            <Loader
                                animationName='pokeball'
                                width={RFValue(200)}
                            />
                        </LoadingListContainer >
                    ) :
                        // <View onStartShouldSetResponder={() => true}>
                        <MyPokemonList
                            data={myPokemon}
                            keyExtractor={(item) => String(item.detailsDataSaved.id)}
                            renderItem={({ item }) => {
                                const { detailsDataSaved, speciesDataSaved } = item;
                                const iconData = getIconTypes(detailsDataSaved.types);
                                return (
                                    <Card>
                                        <ImgContainer>
                                            <PokemonImage
                                                source={{ uri: detailsDataSaved.sprites.front_default }}
                                            />
                                        </ImgContainer>

                                        <CardInfo>
                                            <InfoText
                                                text={detailsDataSaved.name}
                                                textFild="pokemonName"
                                            />
                                            <FooterInfo>
                                                <IconsContainer>
                                                    {
                                                        iconData.map(({ icon: Icon, color }, index) => (
                                                            <IconTyoe
                                                                key={index}
                                                                icon={Icon}
                                                                backgroundColor={color}
                                                            />
                                                        ))
                                                    }
                                                </IconsContainer>
                                                <InfoText
                                                    text={setRarity(speciesDataSaved)}
                                                />
                                            </FooterInfo>
                                        </CardInfo>
                                    </Card>
                                )
                            }}
                            ItemSeparatorComponent={() => <Separator />}
                        />
                        // </View>
                    }
                </Main>
            )}
        </Container>
    );
}
