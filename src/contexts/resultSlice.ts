import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./contextHooks";

const COVERLETTER = "coverletter";
const JOB = "job";
const INTERVIEW = "interview";

interface IResult {
    [COVERLETTER]?: any;
    [JOB]?: any;
    [INTERVIEW]?: any;
    [key: string]: any;
}

interface ResultState {
    isLoading: boolean;
    request: IResult;
    response: IResult;
}

const initialState: ResultState = {
    isLoading: false,
    request: {},
    response: {},
};

interface ResultAction {
    type: string;
    payload: {
        data?: any;
        target: "coverletter" | "interview" | "job";
    };
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
        setResponse: (state, action: ResultAction) => {
            state.response[action.payload.target] = action.payload.data;
        },
        setRequest: (state, action: ResultAction) => {
            state.request[action.payload.target] = action.payload.data;
        },
        setInit: (state, action: ResultAction) => {
            state.isLoading = false;
            state.response[action.payload.target] = null;
            state.request[action.payload.target] = null;
        },
    },
});

const { actions, reducer: resultReducer } = resultSlice;

export const { setLoading, unsetLoading, setInit, setResponse, setRequest } =
    actions;
export const useResultSelector = useAppSelector<ResultState>;

export default resultReducer;
