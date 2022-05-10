import React from 'react';
import { Header } from '../../components/Header';

import {
    Container
} from './styles';

export function Home() {
    return (
        <Container>
            <Header
                title='PokeDev'
                subtitle='Lista de Pokémons'
            />
        </Container>
    );
}
