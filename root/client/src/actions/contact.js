import { PROCESSING_FORM, POST_CONTACT } from "./types";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_FORM
    };
};

export const postInvite = contact => dispatch => {
    dispatch(setLoading());

    axios.post("http://localhost:3001/contact", contact)
    .then(res => dispatch({
        type: POST_CONTACT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};