import type { Reducer } from "redux";

// Action Types
const TEST = "TEST";

// Action Creators
export const testAction = (text: string) => ({ type: TEST, text });

// Initial State
const initialState: any[] = [];

// Reducer
const testReducer: Reducer = (state = initialState, action) => {
    console.log(state, action);

    switch (action.type) {
        case TEST:
            return [...state, action.text];
        default:
            return state;
    }
};

export default testReducer;
