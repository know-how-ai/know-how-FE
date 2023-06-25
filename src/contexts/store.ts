import { HYDRATE } from "next-redux-wrapper";
import { Action, Reducer, combineReducers } from "redux";
import testReducer from "./testCtx";

type TYPE_HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__";
type ActionType = TYPE_HYDRATE | string;

interface ActionInterface extends Action<ActionType> {
    payload?: any;
}

const rootReducer: Reducer = (state, action: ActionInterface) => {
    if (action.type === (HYDRATE as TYPE_HYDRATE)) {
        return action.payload;
    } else {
        const combinedReducer = combineReducers({ testReducer }); // input reducers in object
        return combinedReducer(state, action);
    }
};

export default rootReducer;
