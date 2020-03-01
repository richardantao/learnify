import { 
    SETTINGS_REQUESTED, SETTINGS_ERROR,
    PROFILE_RETURNED, PROFILE_UPDATED,
    PASSWORD_UPDATED,
    PREFERENCES_RETURNED, PREFERENCES_UPDATED
} from "../../actions/types";

const initialState = {
    loading: false,
    profile: {},
    password: "",
    preferences: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SETTINGS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case SETTINGS_ERROR:
            return {
                ...state,
                loading: false
            };
        case PROFILE_RETURNED:
            return {
                ...state,
                loading: false,
                profile: {}
            };
        case PROFILE_UPDATED:
            return {
                ...state,
                loading: false,
                profile: {}
            };
        case PASSWORD_UPDATED: 
            return {
                ...state,
                loading: false,
                password: ""
            };
        case PREFERENCES_RETURNED: 
            return {
                ...state,
                loading: false,
                preferences: {}
            };
        case PREFERENCES_UPDATED:
            return {
                ...state,
                loading: false,
                preferences: {}
            };
        default: 
            return state;
    };
};