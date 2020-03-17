import { combineReducers } from "redux";

/* --- Auth  --- */
// import auth from "./auth/auth";
import error from "./auth/errors";

/* --- Data --- */
import user from "./data/users";
import year from "./data/years";
import term from "./data/terms";
import course from "./data/courses";
import classes from "./data/classes";
import assessment from "./data/assessments";
import task from "./data/tasks";
import bug from "./data/bugs";
import feedback from "./data/feedback";

/* --- Interface --- */
import meta from "./interface/meta";
import property from "./interface/properties";

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
    bug,
    feedback,
    meta,
    property
});