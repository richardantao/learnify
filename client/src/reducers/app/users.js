import { 
    PROCESSING_SETTINGS, 
    EDIT_PROFILE, UPDATE_PROFILE, DELETE_PROFILE,
    EDIT_PASSWORD, UPDATE_PASSWORD,
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
        case PROCESSING_SETTINGS: 
            return {
                ...state,
                loading: true
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