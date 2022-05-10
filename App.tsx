import React from 'react';
import 'react-native-gesture-handler';
import { Home } from './src/screens/Home';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Platform.OS === 'ios' ? theme.colors.comp : theme.colors.transparent}
                translucent={Platform.OS === 'android'}
            />
            <Home />
        </ThemeProvider>
    );
}
