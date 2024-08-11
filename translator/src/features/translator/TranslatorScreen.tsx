import { Confidence, ExchangeLanguage, Loader, SelectLanguage, TextCounter, TextInput } from "lib/components";
import React, { useState } from "react";
import {useDebouncedCallback} from 'use-debounce';
import styled from "styled-components";
import { Language, LanguageCode } from "lib/models/Language";
import { SelectedLanguages } from "./types";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";
import { AutoDetectedLanguage } from "lib/models";
import { useAutoDetectedLanguage, useTranslateText } from "./actions";

type TranslatorScreenProps = {
    languages: Array<Language>
}


export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const T = useTranslations()
    const [translatedText, setTranslatedText] = useState<string>('')
    const [query, setQuery] = useState<string>('')
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>()
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
       source: LanguageCode.Auto,
       target: LanguageCode.Chinese,
    })

    const {isLoading: isDetectingLanguage,
        hasError: hasErrorDetectingLanguage,
        fetch: autoDetectLanguage
    } = useAutoDetectedLanguage(setAutoDetectedLanguage)
    const {
        isLoading: isTranslatingText,
        hasError: hasErrorTranslatingText,
        fetch: translateText
    } = useTranslateText(setTranslatedText)


    const debauncedAction = useDebouncedCallback(
        debaucedQuery => {
            if(debaucedQuery.length < 5) {
                return
            }

            selectedLanguages.source === LanguageCode.Auto
            ? autoDetectLanguage(debaucedQuery) : translateText(debaucedQuery, selectedLanguages)

            if (selectedLanguages.source === LanguageCode.Auto) {
                autoDetectLanguage(debaucedQuery)
            }
        },
        1000
    )

    return (
    <Container>
        <TranslatorContainer>
            <InputContainer>
                    <SelectLanguage
                     languages={languages}
                     exclude={[selectedLanguages.target]}
                     selectedLanguage={selectedLanguages.source}
                     onChange={newCode => setSelectedLanguages(prevState =>({
                        ...prevState,
                        source: newCode
                     }))}
                      />
                    <TextInput
                        autoFocus
                        value={query}
                        onChangeText={newQuery => {
                            if (newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return;
                            }

                            setQuery(newQuery);
                            debauncedAction(newQuery);


                        } }
                        placeholder={T.screens.translator.sourceInputPlaceholder} hasError={false}/>

                            <LoaderContainer>
                            {isDetectingLanguage && (
                                <Loader/>
                            )}
                        </LoaderContainer>

                        <InputFooter>
                            <Confidence
                            hasError={hasErrorDetectingLanguage && selectedLanguages.source === LanguageCode.Auto}
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguages(prevState => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode
                                }))
                                setAutoDetectedLanguage(undefined)
                                debauncedAction(query)
                            }}
                            />
                            <TextCounter
                            counter={query.length}
                            limit={APP_CONFIG.TEXT_INPUT_LIMIT}
                            />
                        </InputFooter>
                    </InputContainer>
                    < ExchangeLanguage
                        hidden={selectedLanguages.source === LanguageCode.Auto}
                        onClick={() => setSelectedLanguages(prevState =>({
                            source: prevState.target,
                            target: prevState.source
                         }))}
                    />
                <InputContainer>
                    <SelectLanguage
                    languages={languages}
                    exclude={[selectedLanguages.source, LanguageCode.Auto]}
                    onChange={newCode => setSelectedLanguages(prevState =>({
                        ...prevState,
                        target: newCode
                     }))}
                    selectedLanguage={selectedLanguages.target}
                     />
                    <TextInput
                    disabled
                    value={translatedText}
                    hasError={!hasErrorTranslatingText}
                    />
                        <LoaderContainer>
                            {isTranslatingText && (
                                <Loader/>
                            )}
                        </LoaderContainer>
            </InputContainer>

        </TranslatorContainer>
    </Container>
)}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({ theme }) => theme.colors.typography};
`;

const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const LoaderContainer = styled.div`
    padding: 5px 10px;
    height: 2px;
`


const InputFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`



// function onSuccess(languages: Language[]): void {
//     throw new Error("Function not implemented.");
// }
