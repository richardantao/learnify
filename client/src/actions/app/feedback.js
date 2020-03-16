import { FEEDBACK_REQUESTED, FEEDBACK_SUBMITTED } from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { 
    return { 
        type: FEEDBACK_REQUESTED
    }; 
};

export const submitFeedback = feedback => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/feedback", feedback/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_SUBMITTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
};