import { ERRORS_RETURNED, ERRORS_LOGGED, ERRORS_CLEARED } from "../types";
import axios from "axios";

/**
 * @param  {string} message - error message
 * @param  {number} status - http status
 * @param  {string} id - identification (type) of the error 
 * @return {Object} action type
 */
export const returnErrors = (message, status, id = null) => {
    return {
        type: ERRORS_RETURNED,
        payload: { message, status, id }
    };
};

export const logErrors = (error, errorInfo) => dispatch => {
    axios.post("/api/v1/errors", { error, errorInfo })
    .then(res => dispatch({
        type: ERRORS_LOGGED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "LOGGING_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "LOGGING_ERROR")
            );
        } else {
            dispatch(
                returnErrors(err.response.data, err.response.status, "LOGGING_ERROR")
            );
        };
    });
};

/**
 * @return {Object} action type
 */
export const clearErrors = () => {
    return {
        type: ERRORS_CLEARED
    };
};