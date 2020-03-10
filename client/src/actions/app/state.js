import { ACTIVE_TERM_REQUESTED, ACTIVE_TERM_SET } from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: ACTIVE_TERM_REQUESTED
    };
};

export const setActiveTerm = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/years?setActiveTerm"/*, tokenConfig(getState)*/) // retrieve the yearId of the current year
    .then(res => {
        return axios.get(`/api/v1/years/${res.data}/terms?setActiveTerm`);
    })
    .then(res => dispatch({
        type: ACTIVE_TERM_SET,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ACTIVE_TERM_FAILED")
    ));
};