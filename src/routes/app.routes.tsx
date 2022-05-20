import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { PokemonDetails } from '../screens/PokemonDetails';
import { MyPokemon } from '../screens/MyPokemon';

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
            <Screen name="MyPokemon" component={MyPokemon} />
        </Navigator>
    );
}
