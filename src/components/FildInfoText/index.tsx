import React from 'react';
import { ViewProps } from 'react-native';
import { InfoText } from '../InfoText';
import { LabelText } from '../LabelText';
import { SkeletonTextLoad } from '../SkeletonTextLoad';

import {
    Container
} from './styles';

interface IFieldInfoText {
    text: string;
    label: string;
    alignText?: "center" | "flex-start" | "flex-end";
    isLoading: boolean;
    isTextWrap?: boolean;
    rowDirection?: boolean;
    widthInPercentageLoad: number;
    textField?: "status" | "" | "type" | "ability" | "moves";
}

export function FildInfoText({
    text,
    label,
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
                (<InfoText
                    text={text}
                    wrap={isTextWrap}
                    textFild={textField}
                    alignText={alignText}
                    rowDirection={rowDirection}
                />)
            }
        </Container>
    );
}
