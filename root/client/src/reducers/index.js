import { combineReducers } from "redux";

import betaReducer from "./beta";
import contactReducer from "./contact";
import errorReducer from "./errors";
import navReducer from "./nav";

export default combineReducers({
    beta: betaReducer,
    contact: contactReducer,
    error: errorReducer,
    nav: navReducer
});