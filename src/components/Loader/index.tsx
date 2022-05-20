import React from 'react';
import LottieView from 'lottie-react-native';
import digletAnimation from '../../assets/diglet.json';
import pokeballAnimation from '../../assets/pokeball.json';
import skeletonTextAnimation from '../../assets/skeleton.json';
import skeletonAnimation from '../../assets/skeletonImage.json';
import pokeballOpen from '../../assets/pokeballOpen.json';



interface ISkeletonTextLoad {
    width: number;
    animationName: "pokeball" | "diglet" | "rectSkeleton" | "skeleton"
}

export function Loader({ width, animationName }: ISkeletonTextLoad) {
    function selectLoad() {
        switch (animationName) {
            case 'pokeball':
                return pokeballAnimation;
            case 'diglet':
                return digletAnimation;
            case 'rectSkeleton':
                return skeletonAnimation;
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
