import { FORM_SUBMITTED, CONTACT_SUCCESS, CONTACT_FAILED } from "../types";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: FORM_SUBMITTED
    };
};

export const postContact = contact => dispatch => {
    dispatch(setLoading());

    axios.post("https://learnify.ca/contact", contact)
    .then(res => dispatch({
        type: CONTACT_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.res.data, err.res.status, "CONTACT_FAILED")
        );
        dispatch({
          type: CONTACT_FAILED
        });
    });
};