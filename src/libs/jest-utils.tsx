import type { PropsWithChildren, ReactNode } from "react";
import { store } from "../contexts/store";
import { Provider } from "react-redux";
import { useUISelector } from "../contexts/uiSlice";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../components/styles/theme";
import { type RenderOptions, render } from "@testing-library/react";

interface Props {
    children: any;
}

export const ThemeWrapper = ({ children }: Props): JSX.Element => {
    const { isDarkmode } = useUISelector((state) => state.ui);

    return (
        <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
};

export const useThemeRender = (
    children: JSX.Element | ReactNode,
    options?: RenderOptions
) => {
    return render(<ThemeWrapper>{children}</ThemeWrapper>, { ...options });
};

export const StoreWrapper = ({
    children,
}: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
};

export const useThemeRenderWithRedux = (
    children: JSX.Element | ReactNode,
    options?: RenderOptions
) => {
    return render(<ThemeWrapper>{children}</ThemeWrapper>, {
        ...options,
        wrapper: StoreWrapper,
    });
};
