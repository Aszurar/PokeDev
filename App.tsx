import 'react-native-gesture-handler';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Platform.OS === 'ios' ? theme.colors.comp : theme.colors.transparent}
                translucent={Platform.OS === 'android'}
            />
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </ThemeProvider>
    );
}
