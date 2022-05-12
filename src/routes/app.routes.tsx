import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { PokemonDetails } from '../screens/PokemonDetails';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            initialRouteName={"Home"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home} />
            <Screen name="PokemonDetails" component={PokemonDetails} />
        </Navigator>
    );
}
