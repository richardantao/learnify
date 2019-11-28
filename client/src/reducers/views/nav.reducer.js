import { 
    LOADING_VIEW, RENDER_DASHBOARD, RENDER_CALENDAR, RENDER_TASKS, 
    RENDER_ASSESSMENTS, RENDER_ACADEMICS, RENDER_SEARCH, RENDER_SETTINGS, RENDER_HELP
} from "../../actions/types";

const initialState = {
    view: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case RENDER_DASHBOARD:
            return {
                view: action.payload   
            };
        case RENDER_CALENDAR:
            return {
                view: action.payload   
            };
        case RENDER_ACADEMICS:
            return {
                view: action.payload   
            };
        case RENDER_TASKS:
            return {
                view: action.payload   
            };
        case RENDER_ASSESSMENTS:
            return {
                view: action.payload   
            };
        case RENDER_SEARCH:
                return {
                    view: action.payload   
                };
        case RENDER_SETTINGS:
            return {
                view: action.payload   
            };
        case RENDER_HELP:
            return {
                view: action.payload   
            };
        default: 
            return state;
    };
};
