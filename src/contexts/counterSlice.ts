import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            state.value += 1;
        },
        decrease: (state) => {
            state.value -= 1;
        },
    },
});

const { actions, reducer: counterReducer } = counterSlice;

export const { increase, decrease } = actions;

export default counterReducer;
