import React, { useMemo } from "react"
import { Language, LanguageCode } from "lib/models"
import styled from "styled-components"

type SelectLanguageProps = {
    languages: Array<Language>
    selectedLanguage: LanguageCode,
    exclude: Array<LanguageCode>,
    onChange(newLanguage: LanguageCode): void
}

export const SelectLanguage: React.FunctionComponent<SelectLanguageProps> = ({
    languages,
    selectedLanguage,
    exclude,
    onChange
}) => {
    const filteredLanguages = useMemo(() => languages
    .filter(language => !exclude.includes(language.code))
    .map(languages =>({
        key: languages.code,
        label: languages.name
    })),
     [languages, exclude]
)
    return (
        <Select
            value={selectedLanguage}
            onChange={Event => onChange(
                Event.target.value as LanguageCode )}
        >
            {filteredLanguages.map(language => (
                <Option
                key={language.key}
                value={language.key}
                >
                    {language.label}
                </Option>
            ))}
        </Select>
    )
}

const Select = styled.select`
    max-width: 140px;
    margin-bottom: 10px;
    /* -webkit-appearance: none; */
    border: 0;
    font-size: 14px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.typography};
    height: 26px;
    padding: 0 10px;

`
const Option = styled.option`

`
