import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { configureStore, type PayloadAction } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import uiReducer from "./uiSlice";

type TYPE_HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";
type ActionType = TYPE_HYDRATE | string;

interface AnyObject {
    [key: string]: any;
}

const rootReducer = (
    state: any,
    action: PayloadAction<AnyObject, ActionType>
) => {
    if (action.type === (HYDRATE as TYPE_HYDRATE)) {
        return { ...state, ...action.payload };
    } else {
        const combinedReducer = combineReducers({
            counter: counterReducer,
            ui: uiReducer,
        }); // input reducers in object
        return combinedReducer(state, action);
    }
};

const makeStore = () => {
    return configureStore({ reducer: rootReducer });
};

export const store = makeStore();
export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
