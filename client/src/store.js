import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

/* --- Reducers --- */
// Auth
// import auth from "./app/reducers/auth/auth";
import error from "./app/reducers/auth/errors";

// Data
import user from "./app/reducers/data/users";
import year from "./app/reducers/data/years";
import term from "./app/reducers/data/terms";
import course from "./app/reducers/data/courses";
import classes from "./app/reducers/data/classes";
import assessment from "./app/reducers/data/assessments";
import task from "./app/reducers/data/tasks";
import bug from "./app/reducers/data/bugs";
import feedback from "./app/reducers/data/feedback";

// Interface
import meta from "./app/reducers/interface/meta";
import property from "./app/reducers/interface/properties";

// Public Form
import form from "./public/reducers/form";

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    // auth,
    meta,
    error,
    property,
    user,
    year,
    term,
    course,
    classes,
    assessment,
    task,
    bug,
    feedback,
    form
});

const store = createStore(
    rootReducer,
    initialState, 
    composeEnhancers(applyMiddleware(...middleware))
); 

export default store;