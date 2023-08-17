import { CircleButton, MoonIcon, SunIcon } from "@components/atoms";

interface ThemeWidgetProps {
    toggleThemeMode?: Function;
    isDarkmode?: boolean;
}

const ThemeWidget = ({ isDarkmode, toggleThemeMode }: ThemeWidgetProps) => {
    return (
        <CircleButton
            data-testid={"theme toggle button"}
            onClick={toggleThemeMode}
        >
            {isDarkmode ? <MoonIcon /> : <SunIcon />}
        </CircleButton>
    );
};

export default ThemeWidget;
