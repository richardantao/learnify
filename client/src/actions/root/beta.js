import { FORM_SUBMITTED, INVITE_SUCCESS, INVITE_FAILED } from "../types";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: FORM_SUBMITTED
    };
};

export const postInvite = beta => dispatch => {
    dispatch(setLoading());

    axios.post("https://learnify.ca/invite", beta)
    .then(res => dispatch({
        type: INVITE_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.res.data, err.res.status, "INVITE_FAILED")
        );
        dispatch({
          type: INVITE_FAILED
        });
    });
};