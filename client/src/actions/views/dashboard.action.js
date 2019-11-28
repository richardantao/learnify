import { LOADING_DASHBOARD, FETCH_DASH_ITEMS } from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_DASHBOARD
    };
};

export const fetchDashItems = () => dispatch => {
    dispatch(setLoading());

    axios.get("/dashboard")
    .then(res => dispatch({
        type: FETCH_DASH_ITEMS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
