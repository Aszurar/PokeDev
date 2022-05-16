import React from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';


interface IPokeballLoad {
    width: number;
}

export function PokeballLoad({ width }: IPokeballLoad) {
    return (
        <LottieView
            source={pokeballAnimation}
            style={{ width: width }}
            resizeMode="contain"
            autoPlay
            loop
        />
    );
}
