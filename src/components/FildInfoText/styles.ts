import styled, { css } from 'styled-components/native';

interface IContainer {
    rowDirection?: boolean;
}

export const Container = styled.View<IContainer>`
    ${({rowDirection}) => rowDirection && css`
        flex-direction: row;
    `}
`;
