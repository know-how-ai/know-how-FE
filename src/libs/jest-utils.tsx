import { PropsWithChildren } from "react";
import userEvent from "@testing-library/user-event";
import { store } from "../contexts/store";
import { Provider } from "react-redux";

export const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
};

export const useEvent = userEvent.setup();
