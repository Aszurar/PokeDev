import React from 'react';
import LottieView from 'lottie-react-native';
import skeletonTextAnimation from '../../assets/skeleton.json';
import pokeballAnimation from '../../assets/pokeball.json';
import digletAnimation from '../../assets/diglet.json';


interface ISkeletonTextLoad {
    width: number;
    animationName: "pokeball" | "diglet" | "skeleton"
}

export function Loader({ width, animationName }: ISkeletonTextLoad) {
    function selectLoad() {
        switch (animationName) {
            case 'pokeball':
                return pokeballAnimation;
            case 'diglet':
                return digletAnimation;
            default:
                return skeletonTextAnimation;
        }
    }


    return (
        <LottieView
            source={selectLoad()}
            style={{ width: width }}
            resizeMode="contain"
            autoPlay
            loop
        />
    );
}
