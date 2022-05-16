import React from 'react';

import {
    Container,
    Title
} from './styles';

interface ILabelText {
    label: string;
}
export function LabelText({ label }: ILabelText) {
    return (
        <Container>
            <Title style={{ includeFontPadding: false }}>
                {label}
            </Title>
        </Container>
    );
}
