import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import {
    Container
} from './styles';

interface IIconType {
    backgroundColor: string;
    icon: React.FC<SvgProps>;
}

export function IconTyoe({ icon: Icon, backgroundColor }: IIconType) {
    return (
        <Container style={{ backgroundColor: backgroundColor }}>
            <Icon
                width={RFValue(24)}
                height={RFValue(24)}
            />
        </Container>
    );
}
