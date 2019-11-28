import { 
    AUTH_ERROR, USER_LOADING, USER_LOADED, LOGIN_SUCCESS,
    LOGIN_FAILED, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED 
} from "../types";
import { returnErrors } from "./errors.action";
import axios from "axios";

// check and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    // match url
    axios.get("/user", tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.message, err.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

// Register User
export const register = ({ fname, lname, email, password }) => dispatch => {
    console.log("... Received user from form")
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request body
    const body = JSON.stringify({ fname, lname, email, password });
    /* ^ body is not receiving first and last name */

    console.log(body);

    /* 
        Axios is not passing a promise
    */
    axios.post("/register", body, config)
    .then(res => dispatch({
       type: REGISTER_SUCCESS,
       payload: res.data 
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.data, err.status, "REGISTER_FAILED")
        );
        dispatch({
            type: REGISTER_FAILED
        });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password });

    axios.post("/signin", body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.data, err.status, "LOGIN_FAILED")
        );
        dispatch({
            type: LOGIN_FAILED
        });
    });
};

// Logout User
export const logout = () => dispatch => {
    axios.post("/signout")
    .then(res => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(err => {
        returnErrors(err.data, err.status);
    });
};

/* VERIFIED */
// Set config/headers and token
export const tokenConfig = getState => {
    // get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json" 
        }
    };

    // If token is generated, add to it to headers
    if(token) {
        config.headers["x-auth-token"] = token;
    };

    return config;
};




