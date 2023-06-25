import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./store";
import { createWrapper } from "next-redux-wrapper";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// const isProduction = process.env.NODE_ENV === "production";

const makeStore = () => {
    // const enhancer = isProduction
    //     ? compose(applyMiddleware())
    //     : composeWithDevTools(applyMiddleware());
    const store = createStore(rootReducer); // 2nd arg: enhancer
    return store;
};

const wrapper = createWrapper(makeStore); // 2nd arg: options { debug: Boolean }

export default wrapper;
