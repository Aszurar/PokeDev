import React from 'react';
import LottieView from 'lottie-react-native';
import pokeballAnimation from '../../assets/pokeball.json';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'react-native-feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {
    BackButton,
    Container,
    HeaderContainer,
    HeaderTitle,
    StripeMoveModal,
    SubHeaderContainer,
    SubHeaderTitle
} from './styles';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';


interface IHeader {
    title: string;
    moveList?: boolean;
    subtitle: string;
    isLoading?: boolean;
    isBackButtonAvailable?: boolean;
}

export function Header({
    title,
    moveList = false,
    subtitle,
    isLoading = false,
    isBackButtonAvailable = false
}: IHeader) {
    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <Container
            moveList={moveList}
        >
            {moveList && (
                <StripeMoveModal
                    style={{ right: RFValue(60) }}
                />
            )}
            {moveList && (
                <StripeMoveModal
                    style={{ left: RFValue(60) }}
                />
            )}
            <HeaderContainer>
                {isBackButtonAvailable && (
                    <BackButton
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft
                            width={RFValue(24)}
                            height={RFValue(24)}
                            stroke={theme.colors.shape}
                            strokeWidth={2}
                        />
                    </BackButton>)
                }

                {!isLoading ? (
                    <HeaderTitle>{capitalizeFirstLetter(title)}</HeaderTitle>
                )
                    :
                    (
                        <LottieView
                            source={pokeballAnimation}
                            style={{ height: RFValue(24), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                            resizeMode="contain"
                            autoPlay
                            loop
                        />
                    )}

            </HeaderContainer>

            <SubHeaderContainer>
                <SubHeaderTitle>{subtitle}</SubHeaderTitle>
            </SubHeaderContainer>
        </Container>
    );
}
