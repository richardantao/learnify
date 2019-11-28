import { LOADING_SETTINGS, RENDER_PROFILE, RENDER_PASSWORD, RENDER_PREFERENCES, RENDER_INTEGRATIONS } from "../../actions/types";

const initialState = {
    form: ""
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_SETTINGS:
            return {
                form: ""
            };
        case RENDER_PROFILE:
            return {
                form: "profile"
            };
        case RENDER_PASSWORD:
            return {    
                form: "password"
            };
        case RENDER_PREFERENCES:
            return {
                form: "preferences"
            };
        case RENDER_INTEGRATIONS:
            return {
                form: "integrations"
            };
        default: 
            return state;
    };
};