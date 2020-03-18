import { 
    BUGS_REQUESTED,
    BUG_SUBMITTED,
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

/**
 * @return {Object} - action type
 */
export const setLoading = () => { 
    return { 
        type: BUGS_REQUESTED
    };
};
/**
 * @param  {Object} bug - data for new bug
 * @param  {function} dispatch - function sending action to reducer
 * @param  {function} getState - retrieves token configuration
 * @return {Object} - action type and payload
 */
export const submitBug = bug => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/bugs", bug/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUG_SUBMITTED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "BUGS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "BUGS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "BUGS_ERROR")
            );
        };
    });
};