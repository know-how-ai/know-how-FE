import {
    CircleButton,
    LoginIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
} from "@components/atoms";
import styled from "styled-components";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${(p) => p.theme.color.backgroundColor + "aa"};
    color: ${(p) => p.theme.color.textColor};
    transition: ${(p) => p.theme.transition.fast};
    z-index: 10;
    min-height: 8rem;
    border-bottom: ${(p) => p.theme.border.active};
    backdrop-filter: blur(0.75px);
    box-shadow: ${(p) => p.theme.boxShadow.strong};
`;

const Logo = styled.span`
    display: inline-block;
    font-weight: 600;
    font-style: italic;
    font-size: ${(p) => p.theme.size.xl};
    margin: auto ${(p) => p.theme.size.xl};
    color: ${(p) => p.theme.color.textColor};
    user-select: none;
`;

const Nav = styled.nav`
    margin: auto ${(p) => p.theme.size.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
`;

const ListItem = styled.li`
    list-style: none;
`;

interface HeaderProps {
    toggleThemeMode?: () => void;
    isDarkmode?: Boolean;
}

const Header = ({ isDarkmode, toggleThemeMode }: HeaderProps) => {
    return (
        <HeaderContainer>
            <Logo>Blog-ify</Logo>
            <Nav>
                <UList>
                    <ListItem>
                        <CircleButton onClick={toggleThemeMode}>
                            {isDarkmode ? <MoonIcon /> : <SunIcon />}
                        </CircleButton>
                    </ListItem>
                    <ListItem>
                        <CircleButton>
                            <UserIcon />
                        </CircleButton>
                    </ListItem>
                    <ListItem>
                        <CircleButton>
                            <LoginIcon />
                        </CircleButton>
                    </ListItem>
                </UList>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
