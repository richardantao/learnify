import { PROCESSING_FORM, POST_INVITE, INVITE_ERROR } from "./types";
import { returnErrors } from "./errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_FORM
    };
};

export const postInvite = beta => dispatch => {
    dispatch(setLoading());

    axios.post("http://localhost:3001/invite", beta)
    .then(res => dispatch({
        type: POST_INVITE,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.res.data, err.res.status, "INVITE_ERROR")
        );
        dispatch({
          type: INVITE_ERROR
        });
    });
};

