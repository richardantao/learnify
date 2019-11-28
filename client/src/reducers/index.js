import { combineReducers } from "redux";

// auth 
import authReducer from "./auth/auth.reducer";
import errorReducer from "./auth/errors.reducer";

// data
import yearReducer from "./data/years.reducer";
import termReducer from "./data/terms.reducer";
import courseReducer from "./data/courses.reducer";
import classReducer from "./data/classes.reducer";
import assessmentReducer from "./data/assessments.reducer";
import taskReducer from "./data/tasks.reducer";
import integrationReducer from "./data/integrations.reducer";

// functions
import counterReducer from "./functions/counter.reducer";

// views
import plannerReducer from "./views/planner.reducer";
import settingsReducer from "./views/settings.reducer";
import navReducer from "./views/nav.reducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    year: yearReducer,
    term: termReducer,
    course: courseReducer,
    class: classReducer,
    assessment: assessmentReducer,
    task: taskReducer,
    integration: integrationReducer,
    counter: counterReducer,
    planner: plannerReducer,
    settings: settingsReducer,
    nav: navReducer
});