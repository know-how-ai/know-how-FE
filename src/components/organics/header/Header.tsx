import {
    Button,
    LoginIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
} from "@components/atoms";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundColor};
    color: ${(props) => props.theme.color.textColor};
    transition: ${(props) => props.theme.transition.fast};
    filter: ${(props) => props.theme.filter.blur};
    min-height: 10vh;
    border-bottom: ${(p) => p.theme.border.active};
    overflow: hidden;
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

const NavButton = styled(Button)`
    text-align: center;
    word-break: keep-all;
    width: 100%;
    padding: 0.5rem;
    max-width: 5rem;
    aspect-ratio: 1 !important;
    border-radius: 100rem !important;
    background-color: ${(p) => p.theme.color.lightBlue};
    color: ${(p) => p.theme.color.textColor};
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
                        <NavButton onClick={toggleThemeMode}>
                            {isDarkmode ? <MoonIcon /> : <SunIcon />}
                        </NavButton>
                    </ListItem>
                    <ListItem>
                        <NavButton>
                            <UserIcon />
                        </NavButton>
                    </ListItem>
                    <ListItem>
                        <NavButton>
                            <LoginIcon />
                        </NavButton>
                    </ListItem>
                </UList>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
