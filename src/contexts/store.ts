import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import {
    type PayloadAction,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import { type PersistConfig, persistReducer } from "redux-persist";
// using the local storage
import storage from "redux-persist/lib/storage";

// if wanna use the session storage,
// import storageSession from 'redux-persist/lib/storage/session'

type TYPE_HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";
type ActionType = TYPE_HYDRATE | string;

interface AnyObject {
    [key: string]: any;
}

const UI = "ui";
const USER = "user";

const rootReducer = (
    state: any,
    action: PayloadAction<AnyObject, ActionType>
) => {
    if (action.type === (HYDRATE as TYPE_HYDRATE)) {
        return { ...state, ...action.payload };
    } else {
        const combinedReducer = combineReducers({
            [UI]: uiReducer,
            [USER]: userReducer,
        }); // input reducers in object
        return combinedReducer(state, action);
    }
};

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    // 로컬/세션스토리지에 저정할 리듀서
    whitelist: [UI, USER],
    // blacklist: 제외할 리듀서
};

const makeStore = () => {
    return configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: getDefaultMiddleware({
            serializableCheck: false,
        }),
    });
};

export const store = makeStore();
export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
