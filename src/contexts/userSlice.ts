import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./contextHooks";

interface IPoint {
    point: number;
}

interface IUser extends IPoint {
    id: number;
    username: string;
    [key: string]: any;
}

interface UserState {
    isLoggedIn: boolean;
    data: IUser | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    data: null,
};

interface UserAction<T> {
    type: string;
    payload: T;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggedIn: (state, action: UserAction<IUser>) => {
            state.isLoggedIn = true;
            state.data = { ...action.payload };
        },
        loggedOut: (state) => {
            state.isLoggedIn = false;
            state.data = null;
        },
        spendPoint: (state) => {
            if (state.data) {
                state.data.point -= 1;
            }
        },
    },
});

const { actions, reducer: userReducer } = userSlice;

export const { loggedOut, loggedIn, spendPoint } = actions;
export const useUserSelector = useAppSelector<UserState>;

export default userReducer;
