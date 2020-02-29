import { combineReducers } from "redux";

/* --- Auth Reducers --- */
// import authReducer from "./auth/auth";
import errorReducer from "./auth/errors";

/* --- Beta App Reducers --- */
import userReducer from "./app/users";
import yearReducer from "./app/years";
import termReducer from "./app/terms";
import courseReducer from "./app/courses";
import classReducer from "./app/classes";
import assessmentReducer from "./app/assessments";
import taskReducer from "./app/tasks";
import bugReducer from "./app/bugs";
import feedbackReducer from "./app/feedback";

/* --- Public Reducers --- */
import betaReducer from "./root/beta";
import contactReducer from "./root/contact";

export default combineReducers({
    // auth: authReducer,
    error: errorReducer,
    user: userReducer,
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