import { PROCESSING_FORM, POST_CONTACT, CONTACT_ERROR } from "../../../../root/client/src/actions/types";
import { returnErrors } from "./errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_FORM
    };
};

export const postContact = contact => dispatch => {
    dispatch(setLoading());

    axios.post("http://localhost:3001/contact", contact)
    .then(res => dispatch({
        type: POST_CONTACT,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.res.data, err.res.status, "CONTACT_ERROR")
        );
        dispatch({
          type: CONTACT_ERROR
        });
    });
};