import { combineReducers } from "redux";

/* --- Auth Reducers --- */
// import auth from "./auth/auth";
import error from "./auth/errors";

/* --- Beta App Reducers --- */
import user from "./app/users";
import year from "./app/years";
import term from "./app/terms";
import course from "./app/courses";
import classes from "./app/classes";
import assessment from "./app/assessments";
import task from "./app/tasks";
import bug from "./app/bugs";
import feedback from "./app/feedback";

/* App Data */
import property from "./app/properties";

/* --- Public Reducers --- */
import betaReducer from "./root/beta";
import contactReducer from "./root/contact";

export default combineReducers({
    // auth,
    error,
    user,
    year,
    term,
    course,
    classes,
    assessment,
    task,
    beta,
    contact,
    bug,
    feedback,
    property
});