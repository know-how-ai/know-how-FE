import { createSlice } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

interface UIState {
    isDarkmode: Boolean;
    showModal: Boolean;
    modalView: null | ReactNode | any;
}

const initialState: UIState = {
    isDarkmode: false,
    showModal: false,
    modalView: null,
};

interface UIAction {
    type: string;
    payload?: {
        modal: null | ReactNode | any;
    };
}

const uiSlice = createSlice({
    name: "reverse",
    initialState,
    reducers: {
        onDarkmode: (state) => {
            state.isDarkmode = true;
        },
        offDarkmode: (state) => {
            state.isDarkmode = false;
        },
        onModal: (state, action: UIAction) => {
            state.showModal = true;
            state.modalView = action.payload?.modal;
        },
        offModal: (state) => {
            state.showModal = false;
            state.modalView = null;
        },
    },
});

const { actions, reducer: uiReducer } = uiSlice;

export const { offDarkmode, offModal, onDarkmode, onModal } = actions;

export default uiReducer;
