import { combineReducers } from "redux";

// auth 
// import authReducer from "./auth/auth";
import errorReducer from "./auth/errors";

// data
import yearReducer from "./data/years";
import termReducer from "./data/terms";
import courseReducer from "./data/courses";
import classReducer from "./data/classes";
import assessmentReducer from "./data/assessments";
import taskReducer from "./data/tasks";
import integrationReducer from "./data/integrations";

// functions
import counterReducer from "./functions/counter";

// views
import plannerReducer from "./views/planner";
import settingsReducer from "./views/settings";
import navReducer from "./views/nav";

export default combineReducers({
    // auth: authReducer,
    error: errorReducer,
    year: yearReducer,
    term: termReducer,
    course: courseReducer,
    classes: classReducer,
    assessment: assessmentReducer,
    task: taskReducer,
    integration: integrationReducer,
    counter: counterReducer,
    planner: plannerReducer,
    settings: settingsReducer,
    nav: navReducer
});