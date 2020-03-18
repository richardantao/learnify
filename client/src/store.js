import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from "./app/reducers";
import publicReducer from "./public/reducers";
import teamReducer from "./team/reducers";

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = () => ({ appReducer, publicReducer, teamReducer });

const store = createStore(
    rootReducer,
    initialState, 
    composeEnhancers(applyMiddleware(...middleware))
); 

export default store;
