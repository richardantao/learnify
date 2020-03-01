import { 
    AUTH_ERROR, 
    USER_REQUESTED, USER_LOADED, USER_DELETED,
    LOGIN_SUCCESS, LOGIN_FAILED, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, REGISTER_FAILED, 
    PASSWORD_RESET_REQUESTED, PASSWORD_RESET_SUCCESS,
    EMAIL_VERIFICATION_SUCCESS
} from "../types";
import { returnErrors } from "./errors";
import axios from "axios";

// check and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_REQUESTED });

    // match url
    axios.get("/api/v1/user", tokenConfig(getState))
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
    axios.post("api/v1/register", body, config)
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

    axios.post("/api/v1/signin", body, config)
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
    axios.post("/api/v1/signout")
    .then(res => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "LOGOUT_FAILED");
    });
};

export const requestPasswordReset = token => dispatch => {
    axios.post("/api/v1/", token)
    .then(res => dispatch({
        type: PASSWORD_RESET_REQUESTED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.message, err.status, "PASSWORD_RESET_REQUEST_FAILED"));
    });
};

export const resetPassword = hash => dispatch => {
    axios.post("/api/v1/", hash)
    .then(res => dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "PASSWORD_RESET_FAILED");
    });
};

export const verifyEmail = token => dispatch => {
    axios.post("/api/v1/email", token)
    .then(res => dispatch({
        type: EMAIL_VERIFICATION_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "EMAIL_VERIFICATION_FAILED");
    });
};

export const deleteUser = id => dispatch => {
    axios.delete("/api/v1/users")
    .then(res => dispatch({
        type: USER_DELETED,
        payload: id
    }))
    .catch(err => {
        dispatch(returnErrors(err.message, err.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

/* VERIFIED */
// Set config/headers and token
export const tokenConfig = getState => {
    // get token from local storage
    // const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json" 
        }
    };

    // If token is generated, add to it to headers
    // if(token) {
        // config.headers["x-auth-token"] = token;
    // };

    return config;
};