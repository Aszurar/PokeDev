import React from 'react';
import { GeneralSearchProvider, IGeneralSearchProvider } from './generalSearch';
import { IndividualSearchProvider } from './individualSearch';
import { MyPokemonProvider } from './myPokemon';

function AppProvider({ children }: IGeneralSearchProvider) {
    return (
        <GeneralSearchProvider>
            <IndividualSearchProvider>
                <MyPokemonProvider>
                    {children}
                </MyPokemonProvider>
            </IndividualSearchProvider>
        </GeneralSearchProvider>
    );
}

export { AppProvider }
