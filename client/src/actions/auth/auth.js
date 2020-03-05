import { 
    AUTH_ERROR, 
    USER_REQUESTED, USER_LOADED, USER_DELETED,
    LOGIN_SUCCESS, LOGIN_FAILED, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, REGISTER_FAILED, 
    PASSWORD_RESET_REQUESTED, PASSWORD_RESET_SUCCESS,
    EMAIL_VERIFICATION_SUCCESS,
    EMAIL_VERIFICATION_RESENT_SUCCESS
} from "../types";
import { returnErrors } from "./errors";
import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_REQUESTED });

    axios.get("/api/v1/users", tokenConfig(getState))
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
    axios.post("api/v1/users", body, config)
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

    axios.post("/api/v1/users/auth", body, config)
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
    axios.delete("/api/v1/users/auth")
    .then(res => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "LOGOUT_FAILED");
    });
};

export const requestPasswordReset = token => dispatch => {
    axios.post("/api/v1/users/password/token", token)
    .then(res => dispatch({
        type: PASSWORD_RESET_REQUESTED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.message, err.status, "PASSWORD_RESET_REQUEST_FAILED"));
    });
};

export const resetPassword = token => dispatch => {
    axios.put("/api/v1/users/password", token)
    .then(res => dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "PASSWORD_RESET_FAILED");
    });
};

export const resendEmailVerification = email => dispatch => {
    axios.post("/api/v1/users/email/token", email)
    .then(res => dispatch({
        type: EMAIL_VERIFICATION_RESENT_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "EMAIL_VERIFICATION_RESENT_FAILED"));
    });
};

export const verifyEmail = token => dispatch => {
    axios.put("/api/v1/users/email/token", token)
    .then(res => dispatch({
        type: EMAIL_VERIFICATION_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "EMAIL_VERIFICATION_FAILED");
    });
};

export const deleteUser = id => dispatch => {
    axios.delete(`/api/v1/users/${id}`)
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

export const tokenConfig = getState => {
    // const token = getState().auth.token;
    
    const config = {
        headers: {
            "Content-Type": "application/json" 
        }
    };

    // if(token) {
        // config.headers["x-auth-token"] = token;
    // };

    return config;
};