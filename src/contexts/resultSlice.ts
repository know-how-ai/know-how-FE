import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./contextHooks";

interface ResultState {
    isLoading: boolean;
    request: { [key: string]: any } | null;
    response: { [key: string]: any } | null;
}

const initialState: ResultState = {
    isLoading: false,
    request: null,
    response: null,
};

interface IResponse {
    response: { [key: string]: any };
}

interface IRequest {
    request: { [key: string]: any };
}

interface ResultAction<T> {
    type: string;
    payload: T;
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        unsetLoading: (state) => {
            state.isLoading = false;
        },
        setResponse: (state, action: ResultAction<IResponse>) => {
            state.response = action.payload.response;
        },
        setRequest: (state, action: ResultAction<IRequest>) => {
            state.request = action.payload.request;
        },
        setInit: (state) => {
            state.isLoading = false;
            state.response = null;
            state.request = null;
        },
    },
});

const { actions, reducer: resultReducer } = resultSlice;

export const { setLoading, unsetLoading, setInit, setResponse, setRequest } =
    actions;
export const useResultSelector = useAppSelector<ResultState>;

export default resultReducer;
