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
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "FEEDBACK_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "FEEDBACK_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "FEEDBACK_ERROR")
            );
        };
    });
};