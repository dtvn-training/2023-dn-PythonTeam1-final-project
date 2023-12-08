import React from "react";
import rootReducer from "./reducers/rootReducer";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunk],
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

function DataProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}

export default DataProvider;
