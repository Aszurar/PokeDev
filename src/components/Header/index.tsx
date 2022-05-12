import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ChevronLeft } from 'react-native-feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {
    BackButton,
    Container,
    HeaderContainer,
    HeaderTitle,
    SubHeaderContainer,
    SubHeaderTitle
} from './styles';


interface IHeader {
    title: string;
    subtitle: string;
    isBackButtonAvailable?: boolean;
}

export function Header({
    title,
    subtitle,
    isBackButtonAvailable = false
}: IHeader) {
    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <Container>
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
                <HeaderTitle>{title}</HeaderTitle>
            </HeaderContainer>

            <SubHeaderContainer>
                <SubHeaderTitle>{subtitle}</SubHeaderTitle>
            </SubHeaderContainer>
        </Container>
    );
}
