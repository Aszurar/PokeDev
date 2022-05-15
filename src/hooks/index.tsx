import React from 'react';
import { GeneralSearchProvider, IGeneralSearchProvider } from './generalSearch';
import { IndividualSearchProvider } from './individualSearch';

function AppProvider({ children }: IGeneralSearchProvider) {
    return (
        <GeneralSearchProvider>
            <IndividualSearchProvider>
                {children}
            </IndividualSearchProvider>
        </GeneralSearchProvider>
    );
}

export { AppProvider }
