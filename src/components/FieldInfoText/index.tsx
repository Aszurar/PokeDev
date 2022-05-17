import React from 'react';
import { View } from 'react-native';
import { InfoText } from '../InfoText';
import { LabelText } from '../LabelText';
import { Loader } from '../Loader';

import {
    Container
} from './styles';


interface IFieldInfoText {
    text?: string;
    label: string;
    widthLoad: number;
    loadName?: string;
    typeColor?: string;
    isLoading: boolean;
    isTextWrap?: boolean;
    capitalize?: boolean;
    rowDirection?: boolean;
    loadAnimaton?: "rectSkeleton" | "skeleton";
    alignText?: "center" | "flex-start" | "flex-end";
    textField?: "status" | "" | "type" | "ability" | "moves" | "pokemonName";
}

export function FieldInfoText({
    text,
    label,
    typeColor,
    alignText,
    textField,
    isLoading,
    isTextWrap,
    widthLoad,
    capitalize = false,
    rowDirection = false,
    loadAnimaton = "skeleton",
}: IFieldInfoText) {
    return (
        <Container rowDirection={rowDirection}>
            <LabelText
                label={label}
            />

            {isLoading ?
                (<Loader width={widthLoad}
                    animationName={loadAnimaton}
                />)
                :
                (
                    <InfoText
                        text={text!}
                        wrap={isTextWrap}
                        typeColor={typeColor}
                        textFild={textField}
                        alignText={alignText}
                        capitalize={capitalize}
                        rowDirection={rowDirection}
                    />
                )

            }
        </Container>
    );
}
