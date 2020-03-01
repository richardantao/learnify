import { ERRORS_RETURNED, ERRORS_CLEARED } from "../types";

export const returnErrors = (message, status, id = null) => {
    return {
        type: ERRORS_RETURNED,
        payload: { message, status, id }
    };
};

export const clearErrors = () => {
    return {
        type: ERRORS_CLEARED
    };
};