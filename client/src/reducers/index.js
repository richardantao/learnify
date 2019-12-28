import { combineReducers } from "redux";

// auth 
// import authReducer from "./auth/auth";
import errorReducer from "./auth/errors";

// data
import yearReducer from "./beta/years";
import termReducer from "./beta/terms";
import courseReducer from "./beta/courses";
import classReducer from "./beta/classes";
import assessmentReducer from "./beta/assessments";
import taskReducer from "./beta/tasks";
import integrationReducer from "./beta/integrations";

export default combineReducers({
    // auth: authReducer,
    error: errorReducer,
    year: yearReducer,
    term: termReducer,
    course: courseReducer,
    classes: classReducer,
    assessment: assessmentReducer,
    task: taskReducer,
    integration: integrationReducer
});