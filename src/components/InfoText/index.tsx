import React from 'react';

import {
    Container,
    Title
} from './styles';

interface IInfoText {
    text: string;
    wrap?: boolean;
    typeColor?: string;
    rowDirection?: boolean;
    capitalize?: boolean;
    alignText?: "center" | "flex-start" | "flex-end";
    textFild?: "ability" | "type" | "moves" | "status" | "" | "pokemonName";
}

export function InfoText({
    text,
    wrap = false,
    typeColor,
    rowDirection,
    capitalize,
    textFild = "",
    alignText = "flex-start",
}: IInfoText) {
    return (
        <Container
            wrap={wrap}
            style={{ justifyContent: alignText }}
            rowDirection={rowDirection}
            textFild={textFild}
            typeColor={typeColor}
        >

            <Title
                textFild={textFild}
                style={{ includeFontPadding: false }}
                capitalize={capitalize}
            >
                {text}
            </Title>
        </Container>
    );
}
