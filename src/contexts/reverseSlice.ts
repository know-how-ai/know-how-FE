import { createSlice } from "@reduxjs/toolkit";

interface ReverseState {
    num: number;
}

const initialState: ReverseState = {
    num: 0,
};

const reverseSlice = createSlice({
    name: "reverse",
    initialState,
    reducers: {
        reIncrease: (state) => {
            state.num -= 1;
        },
        reDecrease: (state) => {
            state.num += 1;
        },
    },
});

const { actions, reducer: reverseReducer } = reverseSlice;

export const { reIncrease, reDecrease } = actions;

export default reverseReducer;
