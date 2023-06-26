import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string | number;
    username: string;
    blogname: string;
    avatarUrl: null | string;
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
        editProfile: (state, action: UserAction) => {
            state.data = { ...state, ...action.payload };
        },
    },
});

const { actions, reducer: userReducer } = userSlice;

export const { loggedOut, loggedIn, editProfile } = actions;

export default userReducer;
