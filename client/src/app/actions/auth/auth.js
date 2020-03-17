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

/**
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 */
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

/**
 * @param  {string} first - user's first name
 * @param  {string} last - user's last name
 * @param  {string} email - user's email 
 * @param  {string} password - user's password
 * @param  {function} dispatch - returns action to reducer
 * @return {Object} - return async action through dispatch 
 */
export const register = ({ first, last, email, password }) => dispatch => {
    console.log("... Received user from form")
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ first, last, email, password });

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

/**
 * @param  {string} - 
 * @param  {string} - 
 * @param  {function} dispatch - 
 * @return {Object} - 
 */
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password });

    /**
     * @param {Object} body - 
     * @param {Object} config - 
     * @return {Object} -  
     */
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

/**
 * @param  {function} dispatch - 
 * @return {Object} - 
 */
export const logout = () => dispatch => {
    axios.delete("/api/v1/users/auth")
    .then(res => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(err => {
        returnErrors(err.data, err.status, "LOGOUT_FAILED");
    });
};

/**
 * @param {Object} token - 
 * @param  {function} - 
 * @return {Object} - 
 */
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

/**
 * @param {token} - 
 * @param  {function} dispatch - 
 * @return {Object} config - 
 */
export const resetPassword = token => dispatch => {
    axios.put("/api/v1/users/password", token)
    .then(res => dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        returnErrors(err.res.data, err.res.status, "PASSWORD_RESET_FAILED");
    });
};

/**
 * @param  {function} getState - 
 * @return {Object} config - 
 */
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

/**
 * @param  {function} getState - 
 * @return {Object} config - 
 */
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

/**
 * @param  {string} id - ObjectId 
 * @return {Object} -  
 */
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
/**
 * @param  {function} getState - 
 * @return {Object} - sets header
 */
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