import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./contextHooks";

interface UIState {
    isDarkmode: boolean;
    showModal: boolean;
    toast?: string | false | "로그인이 필요합니다.";
}

const initialState: UIState = {
    isDarkmode: false,
    showModal: false,
    toast: false,
};

interface UIAction {
    type: string;
    payload: {
        toast: string | "로그인이 필요합니다.";
    };
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        onDarkmode: (state) => {
            state.isDarkmode = true;
        },
        offDarkmode: (state) => {
            state.isDarkmode = false;
        },
        setToast: (state, action: UIAction) => {
            state.toast = action.payload.toast;
        },
        unsetToast: (state) => {
            state.toast = false;
        },
        onModal: (state) => {
            state.showModal = true;
        },
        offModal: (state) => {
            state.showModal = false;
        },
    },
});

const { actions, reducer: uiReducer } = uiSlice;

export const {
    offDarkmode,
    offModal,
    onDarkmode,
    onModal,
    setToast,
    unsetToast,
} = actions;
export const useUISelector = useAppSelector<UIState>;

export default uiReducer;
