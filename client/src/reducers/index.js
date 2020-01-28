import { combineReducers } from "redux";
import Loadable from "react-loadable";

/* --- Auth Reducers --- */
// const authReducer = Loadable({
//     loader: () => import(/* webpackChunkName: "authReducer" */ "./auth/auth"),
//     loading: () => null
// });

const errorReducer = Loadable({
    loader: () => import(/* webpackChunkName: "errorReducer" */ "./auth/errors"),
    loading: () => null
});

/* --- Beta App Reducers --- */
const yearReducer = Loadable({
    loader: () => import(/* webpackChunkName: "yearReducer" */ "./beta/years"),
    loading: () => null
});

const termReducer = Loadable({
    loader: () => import(/* webpackChunkName: "termReducer" */ "./beta/terms"),
    loading: () => null
});

const courseReducer = Loadable({
    loader: () => import(/* webpackChunkName: "courseReducer" */ "./beta/courses"),
    loading: () => null
});

const classReducer = Loadable({
    loader: () => import(/* webpackChunkName: "classReducer" */ "./beta/classes"),
    loading: () => null
});

const assessmentReducer = Loadable({
    loader: () => import(/* webpackChunkName: "assessmentReducer" */ "./beta/assessments"),
    loading: () => null
});

const taskReducer = Loadable({
    loader: () => import(/* webpackChunkName: "taskReducer" */ "./beta/tasks"),
    loading: () => null
});

const bugReducer = Loadable({
    loader: () => import(/* webpackChunkName: "bugReducer" */ "./beta/bugs"),
    loading: () => null
});

const feedbackReducer = Loadable({
    loader: () => import(/* webpackChunkName: "feedbackReducer" */ "./beta/feedback"),
    loading: () => null
});

/* --- Public Reducers --- */
const betaReducer = Loadable({
    loader: () => import(/* webpackChunkName: "betaReducer" */ "./root/beta"),
    loading: () => null
});

const contactReducer = Loadable({
    loader: () => import(/* webpackChunkName: "contactReducer" */ "./root/contact"),
    loading: () => null
});

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