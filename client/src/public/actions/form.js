import { FORM_PROCESSING, FORM_SUCCESS, FORM_FAILED } from "./types";
import { returnErrors } from "./errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: FORM_PROCESSING
    };
};

export const postForm = (form, data) => dispatch => {
    dispatch(setLoading());

    axios.post(`https://learnify.ca/${form}`, data)
    .then(res => dispatch({
        type: FORM_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.res.data, err.res.status, "FORM_FAILED")
        );
        dispatch({
            type: FORM_FAILED
        });
    });
};