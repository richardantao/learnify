import { 
    YEARS_REQUESTED,
    YEAR_CREATED,
    YEARS_FETCHED,
    YEAR_RETURNED, YEAR_UPDATED, YEAR_DELETED
} from "../../actions/types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: YEARS_REQUESTED
    };
};

export const createYear = year => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/years", year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_CREATED, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

export const fetchYears = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/years"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEARS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

export const editYear = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

export const updateYear = (_id, year) => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`/api/v1/years/${_id}`, year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

export const deleteYear = _id => (dispatch, getState) => {
    axios.delete(`/api/v1/years/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_DELETED,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};
