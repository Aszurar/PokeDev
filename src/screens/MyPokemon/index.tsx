import React from 'react';
import { Header } from '../../components/Header';

import {
    Container
} from './styles';

export function MyPokemon() {



    return (
        <Container>
            <Header
                title='Mochila'
                subtitle='Meus Pokemon'
                isBackButtonAvailable
            />
            {/*
{generalListError || individualSearchError ? (

<ErrorComponent
    title='Ocorreu um erro ao buscar o Pokémon, verifique se o nome está correto e tente novamente'
    icon={Search}
    home
/>
) : (
<PokemonListContainer>
    {(generalListLoading || individualSearchLoading) ? (
        <LoadingListContainer>
            <Loader
                animationName='pokeball'
                width={RFValue(200)}
            />
        </LoadingListContainer >
    ) :
        <View onStartShouldSetResponder={() => true}>
            <PokemonList
                data={listShowedInComponents.results}
            />
        </View>
    }
</PokemonListContainer>
)} */}
        </Container>
    );
}
