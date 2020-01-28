import { combineReducers } from "redux";

/* --- Auth Reducers --- */
// import authReducer from "./auth/auth";
import errorReducer from "./auth/errors";

/* --- Beta App Reducers --- */
import yearReducer from "./beta/years";
import termReducer from "./beta/terms";
import courseReducer from "./beta/courses";
import classReducer from "./beta/classes";
import assessmentReducer from "./beta/assessments";
import taskReducer from "./beta/tasks";
import bugReducer from "./beta/bugs";
import feedbackReducer from "./beta/feedback";

/* --- Public Reducers --- */
import betaReducer from "./root/beta";
import contactReducer from "./root/contact";

export default combineReducers({
    // auth: authReducer,
    error: errorReducer,
    year: yearReducer,
    term: termReducer,
    course: courseReducer,
    classes: classReducer,
    assessment: assessmentReducer,
    task: taskReducer,
    beta: betaReducer,
    contact: contactReducer,
    bug: bugReducer,
    feedback: feedbackReducer
});