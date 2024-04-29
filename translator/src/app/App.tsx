import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../lib/styles";
import { TranslatorScreen } from "../features/translator";

export const App = () => (
    <ThemeProvider theme={theme}>
        <AppContainer>
            <TranslatorScreen/>
        </AppContainer>
    </ThemeProvider>
);

const AppContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
`;
