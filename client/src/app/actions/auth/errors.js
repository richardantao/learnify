import { ERRORS_RETURNED, ERRORS_CLEARED } from "../types";

/**
 * @param  {string} message - error message
 * @param  {number} status - http status
 * @param  {string} id - identification (type) of the error 
 * @return {Object} - 
 */
export const returnErrors = (message, status, id = null) => {
    return {
        type: ERRORS_RETURNED,
        payload: { message, status, id }
    };
};

/**
 * @return {Object} - action type
 */
export const clearErrors = () => {
    return {
        type: ERRORS_CLEARED
    };
};