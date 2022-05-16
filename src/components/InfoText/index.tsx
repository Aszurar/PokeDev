import React from 'react';
import { TextProps } from 'react-native';

import {
    Container,
    Title
} from './styles';

interface IInfoText {
    text: string;
    wrap?: boolean;
    rowDirection?: boolean;
    alignText?: "center" | "flex-start" | "flex-end";
    textFild?: "ability" | "type" | "moves" | "status" | "";
}

export function InfoText({ wrap = false, text, textFild = "", alignText = "flex-start", rowDirection }: IInfoText) {
    return (
        <Container
            wrap={wrap}
            style={{ justifyContent: alignText }}
            rowDirection={rowDirection}
        >
            <Title
                type={text}
                textFild={textFild}
                style={{ includeFontPadding: false }}
            >
                {text}
            </Title>
        </Container>
    );
}
