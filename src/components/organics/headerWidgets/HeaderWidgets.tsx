import { ProfileWidget, ThemeWidget } from "@components/molecules";
import styled from "styled-components";

const Nav = styled.nav`
    margin: auto ${(p) => p.theme.size.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
`;

const ListItem = styled.li`
    list-style: none;
`;

interface HeaderWidgetsProps {
    toggleThemeMode?: Function;
    isDarkmode?: boolean;
    onModal?: Function;
    themeWidget?: boolean;
    profileWidget?: boolean;
}

const HeaderWidgets = ({
    isDarkmode,
    onModal,
    toggleThemeMode,
    profileWidget,
    themeWidget,
}: HeaderWidgetsProps) => {
    return (
        <Nav>
            <UList>
                <ListItem>
                    {themeWidget ? (
                        <ThemeWidget
                            isDarkmode={isDarkmode}
                            toggleThemeMode={toggleThemeMode}
                        />
                    ) : null}
                </ListItem>

                <ListItem>
                    {profileWidget ? <ProfileWidget onModal={onModal} /> : null}
                </ListItem>
            </UList>
        </Nav>
    );
};

export default HeaderWidgets;
