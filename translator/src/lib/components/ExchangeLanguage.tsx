import { Images } from "assets"
import styled from "styled-components"

type ExchangeLanguageProps = {
    onClick(): void
    hidden: boolean
}

export const ExchangeLanguage: React.FunctionComponent<ExchangeLanguageProps> = ({
    onClick,
    hidden
}) => (
    <ExchangeContainer>
        {!hidden && (
            <Exchange src={Images.Exchange}
            onClick={onClick}
            />
        )}
    </ExchangeContainer>
)

const ExchangeContainer = styled.div`
    width: 25px;
    height: 25px;
`

const Exchange = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
`
