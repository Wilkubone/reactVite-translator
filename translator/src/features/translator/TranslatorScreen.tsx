import React from "react";
import styled from "styled-components";
import { useTranslations } from "../../lib/hooks";

export const TranslatorScreen: React.FunctionComponent = () => {
    const T = useTranslations()

    return (
    <Container>
        {T.appName}
    </Container>
)}
const Container = styled.div`
    color: ${({ theme }) => theme.colors.typography};
`;
