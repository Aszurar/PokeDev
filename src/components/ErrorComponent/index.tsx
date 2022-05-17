import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { Loader } from '../Loader';

import {
    Container,
    ErrorSearchContainer,
    ErrorText
} from './styles';

interface IErrorComponent {
    title: string;
    icon: React.FC<SvgProps>;
    home?: boolean;
}

export function ErrorComponent({ icon: Icon, title, home = false }: IErrorComponent) {
    const theme = useTheme();

    return (
        <Container
            home={home}
        >
            <ErrorSearchContainer>
                <Icon
                    width={RFValue(100)}
                    height={RFValue(100)}
                    color={theme.colors.dark}
                    strokeWidth={2}
                />
                <ErrorText>
                    {title}
                </ErrorText>
            </ErrorSearchContainer>
            <Loader
                width={RFValue(400)}
                animationName='diglet'
            />
        </Container>
    );
}
