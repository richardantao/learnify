import { 
    AUTH_ERROR, 
    USER_LOADING, USER_LOADED, 
    LOGIN_SUCCESS, LOGIN_FAILED, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, REGISTER_FAILED,
    PROCESSING_EMAIL, PROCESSING_EMAIL_FAILED, VERIFY_EMAIL 
} from "../../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAILED:
            return {
                ...state,
                user: null,
                loading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS: 
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        case PROCESSING_EMAIL:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_EMAIL_FAILED:
            return {
                ...state,
                loading: false
            };
        case VERIFY_EMAIL:
            return {
                ...state,
                loading: false,
                
            };
        default:
            return state;
    };
};