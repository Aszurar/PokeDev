import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import {
    CloseButton,
    Container
} from './styles';

interface ICloseModalButton {
    onClose: () => void;
    iconColor: string;
    icon: React.FC<SvgProps>;
}

export function CloseModalButton({ onClose, iconColor, icon: Icon }: ICloseModalButton) {
    return (
        <Container>
            <GestureHandlerRootView>
                <CloseButton onPress={onClose}>
                    <Icon
                        color={iconColor}
                        width={RFValue(36)}
                        height={RFValue(36)}
                    />
                </CloseButton>
            </GestureHandlerRootView>
        </Container>
    );
}
