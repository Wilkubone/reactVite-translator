import { Images } from "assets"
import { APP_CONFIG } from "lib/config"
import { useTranslations } from "lib/hooks"
import styled from "styled-components"

export const Header = () => {
    const T = useTranslations()

    return(
        <HeaderContainer>
            <LogoContainer>
                <Logo src={Images.Logo}/>
                <Title>
                    {T.components.header.title}
                </Title>
            </LogoContainer>
            <LinkContainer>
                <Link href={APP_CONFIG.GITHUB_URL} target="blank">
                {T.components.header.github}
                </Link>
                <Link href={APP_CONFIG.DISCORD_URL}target="_blank">
                {T.components.header.discord}
                </Link>
            </LinkContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
     height: 60px;
     background-color: ${({ theme }) => theme.colors.foreground};
     flex-direction: row;
     padding: 0 15px;
     justify-content: space-between;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Logo = styled.img`
    width: 60p;
    height: 60px;
    
`
const Title = styled.h1`
    display: inline;
    font-size: 21px;
    color: ${({ theme }) => theme.colors.typography};
    padding-left: 10px;
`
const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    
`
const Link = styled.a`
    color: ${({ theme }) => theme.colors.typography};
    text-decoration: underline;
    cursor: pointer;
    padding: 0 15px;
    
`