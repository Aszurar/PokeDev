import React from 'react';
import { InfoText } from '../InfoText';
import { LabelText } from '../LabelText';
import { SkeletonTextLoad } from '../SkeletonTextLoad';

import {
    Container
} from './styles';

interface IFieldInfoText {
    text: string;
    label: string;
    typeColor?: string;
    isLoading: boolean;
    isTextWrap?: boolean;
    rowDirection?: boolean;
    widthInPercentageLoad: number;
    alignText?: "center" | "flex-start" | "flex-end";
    textField?: "status" | "" | "type" | "ability" | "moves";
}

export function FildInfoText({
    text,
    label,
    typeColor,
    alignText,
    textField,
    isLoading,
    isTextWrap,
    rowDirection = false,
    widthInPercentageLoad,
}: IFieldInfoText) {
    return (
        <Container rowDirection={rowDirection}>
            <LabelText
                label={label}
            />

            {isLoading ?
                (<SkeletonTextLoad width={widthInPercentageLoad} />)
                :
                (
                    <InfoText
                        text={text}
                        wrap={isTextWrap}
                        typeColor={typeColor}
                        textFild={textField}
                        alignText={alignText}
                        rowDirection={rowDirection}
                    />
                )
            }
        </Container>
    );
}
