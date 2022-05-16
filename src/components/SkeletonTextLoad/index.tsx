import React from 'react';
import LottieView from 'lottie-react-native';
import skeletonTextAnimation from '../../assets/skeleton.json';

interface ISkeletonTextLoad {
    width: number;
}

export function SkeletonTextLoad({ width }: ISkeletonTextLoad) {
    return (
        <LottieView
            source={skeletonTextAnimation}
            style={{ width: width }}
            resizeMode="contain"
            autoPlay
            loop
        />
    );
}
