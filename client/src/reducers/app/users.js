import { 
    PROCESSING_PROFILE, PROCESSING_PROFILE_FAILED, 
    EDIT_PROFILE, UPDATE_PROFILE, DELETE_PROFILE,
    PROCESSING_PASSWORD, PROCESSING_PASSWORD_FAILED,
    EDIT_PASSWORD, UPDATE_PASSWORD,
    PROCESSING_PREFERENCES, PROCESSING_PREFERENCES_FAILED,
    EDIT_PREFERENCES, UPDATE_PREFERENCES
} from "../../actions/types";

const initialState = {
    loading: false,
    profile: {},
    password: {},
    preferences: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_PROFILE:
        case PROCESSING_PASSWORD:
        case PROCESSING_PREFERENCES:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_PROFILE_FAILED:
        case PROCESSING_PASSWORD_FAILED:
        case PROCESSING_PREFERENCES_FAILED: 
            return {
                ...state,
                loading: false
            };
        case EDIT_PROFILE:
            return {
                ...state,
                loading: false,
                profile: {}
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: false,
                profile: {}
            };
        case DELETE_PROFILE:
            return {
                ...state,
                loading: false,
                profile: {}
            };
        case EDIT_PASSWORD:
            return {
                ...state,
                loading: false,
                password: {}
            };
        case UPDATE_PASSWORD: 
            return {
                ...state,
                loading: false,
                password: {}
            };
        case EDIT_PREFERENCES: 
            return {
                ...state,
                loading: false,
                preferences: {}
            };
        case UPDATE_PREFERENCES:
            return {
                ...state,
                loading: false,
                preferences: {}
            };
        default: 
            return state;
    };
};