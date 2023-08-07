import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./contextHooks";

interface User {
    id: string | number;
    username: string;
    point: number;
    [key: string]: any;
}

interface UserState {
    isLoggedIn: boolean;
    data: User | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    data: null,
};

interface UserAction {
    type: string;
    payload: User;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggedIn: (state, action: UserAction) => {
            state.isLoggedIn = true;
            state.data = { ...action.payload };
        },
        loggedOut: (state) => {
            state.isLoggedIn = false;
            state.data = null;
        },
    },
});

const { actions, reducer: userReducer } = userSlice;

export const { loggedOut, loggedIn } = actions;
export const useUserSelector = useAppSelector<UserState>;

export default userReducer;
