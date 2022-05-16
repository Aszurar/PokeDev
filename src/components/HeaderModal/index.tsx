import React from 'react';
import { SvgProps } from 'react-native-svg';
import { CloseModalButton } from '../CloseModalButton';

import {
    Container,
    Title,
    TitleContainer
} from './styles';

interface IHeaderModal {
    title: string;
    iconColor: string;
    titleColor: string;
    onClose: () => void;
    borderColor: string;
    icon: React.FC<SvgProps>;
    backgroundColor: string;
}

export function HeaderModal({ icon, title, onClose, iconColor, titleColor, borderColor, backgroundColor }: IHeaderModal) {
    return (
        <Container
            backgroundColor={backgroundColor}
            borderColor={borderColor}
        >
            <CloseModalButton
                icon={icon}
                onClose={onClose}
                iconColor={iconColor}
            />

            <TitleContainer>
                <Title titleColor={titleColor} >{title}</Title>
            </TitleContainer>

            <CloseModalButton
                onClose={onClose}
                iconColor={iconColor}
                icon={icon}
            />
        </Container >
    );
}
