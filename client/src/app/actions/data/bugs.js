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
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
};