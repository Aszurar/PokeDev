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
    alignText?: "center" | "flex-start" | "flex-end";
    textFild?: "ability" | "type" | "moves" | "status" | "";
}

export function InfoText({ wrap = false, text, textFild = "", typeColor, alignText = "flex-start", rowDirection }: IInfoText) {
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
            >
                {text}
            </Title>
        </Container>
    );
}
