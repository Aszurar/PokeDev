import React from 'react';
import TransparentPokeball from '../../assets/icons/transparent-pokeball.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../../components/Header';
import { PokemonList } from '../../components/PokemonList';
import { SearchInput } from '../../components/SearchInput';
import {
    Container,
    LoadingListContainer,
    PokemonListContainer,
    SearchContainer,
    TotalPokemonContainer,
    TotalPokemonText
} from './styles';
import { Search } from 'react-native-feather';
import { useGeneralSearch } from '../../hooks/generalSearch';
import { useIndividualSearch } from '../../hooks/individualSearch';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Loader } from '../../components/Loader';
import { ErrorComponent } from '../../components/ErrorComponent';

import Animated, {
    Easing,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming
} from 'react-native-reanimated';

import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
export interface IGeralSearch {
    count: number;
    results: {
        name: string;
        url: string;
    }[];
}

const MyPokemonButtonAnimated = Animated.createAnimatedComponent(RectButton);


export function Home() {
    const { generalSearchProps } = useGeneralSearch();
    const theme = useTheme();
    const { navigate } = useNavigation<any>();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const animation = useSharedValue(0);


    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = event.translationX + ctx.positionX;
            positionY.value = event.translationY + ctx.positionY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            animation.value = withSpring(0);
        }
    })

    const handleMyPokemonButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: positionX.value,
                },
                {
                    translateY: positionY.value,
                },
                {
                    rotate: String(interpolate(animation.value,
                        [0, 1],
                        [0, 360]
                    )) + 'deg'
                }
            ]
        };
    })

    const {
        listShowedInComponents,
        totalPokemon,
        generalListError,
        generalListLoading,
    } = generalSearchProps;


    const { individualSearchProps } = useIndividualSearch();
    const { individualSearchLoading, individualSearchError } = individualSearchProps

    useFocusEffect(() => {
        positionX.value = 0;
        positionY.value = 0;
    })

    function testAnimation() {
        animation.value = withRepeat(withTiming(1,
            {
                duration: 1000,
                easing: Easing.linear,

            }
        ), Infinity)

    }

    function handleMyPokemon() {
        testAnimation()
        setTimeout(() => {
            navigate('MyPokemon')
            animation.value = withSpring(0);
        }, 500)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header
                    title='PokeDev'
                    subtitle='Lista de Pokémons'
                />

                <SearchContainer>
                    <SearchInput />

                    <TotalPokemonContainer>
                        {generalListLoading ? (
                            <Loader
                                width={RFValue(24)}
                                animationName='pokeball'
                            />
                        ) :
                            (<TotalPokemonText
                                style={{
                                    includeFontPadding: false,
                                }}>
                                {String(totalPokemon)}
                            </TotalPokemonText>)
                        }
                    </TotalPokemonContainer>

                </SearchContainer>


                {generalListError || individualSearchError ? (

                    <ErrorComponent
                        title='Ocorreu um erro ao buscar o Pokémon, verifique se o nome está correto e tente novamente'
                        icon={Search}
                        home
                    />
                ) : (
                    <PokemonListContainer>
                        {(generalListLoading || individualSearchLoading) ? (
                            <LoadingListContainer>
                                <Loader
                                    animationName='pokeball'
                                    width={RFValue(200)}
                                />
                            </LoadingListContainer >
                        ) :
                            <View onStartShouldSetResponder={() => true}>
                                <PokemonList
                                    data={listShowedInComponents.results}
                                />
                            </View>
                        }
                    </PokemonListContainer>
                )}


                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                >
                    <Animated.View
                        style={[
                            handleMyPokemonButtonAnimation
                            , {
                                position: 'absolute',
                                bottom: RFValue(13),
                                right: RFValue(22),
                            }
                        ]}
                    >
                        <MyPokemonButtonAnimated
                            onPress={handleMyPokemon}
                            style={[styles.container, { backgroundColor: theme.colors.danger }]}
                        >
                            <TransparentPokeball
                                fill={theme.colors.shape}
                                width={RFValue(45)}
                                height={RFValue(45)}
                            />
                        </MyPokemonButtonAnimated>
                    </Animated.View>
                </PanGestureHandler>
            </Container>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: RFValue(60),
        height: RFValue(60),
        borderRadius: RFValue(30),

        alignItems: 'center',
        justifyContent: 'center',
    },
})
