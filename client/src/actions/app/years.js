import { 
    LOADING_YEARS, FETCH_YEARS, 
    CREATE_YEAR, 
    EDIT_YEAR, UPDATE_YEAR, DELETE_YEAR 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_YEARS
    };
};

export const createYear = year => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/years", year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: CREATE_YEAR, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const fetchYears = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/years"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_YEARS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const editYear = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_YEAR,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const updateYear = (_id, year) => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`/api/v1/years/${_id}`, year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_YEAR,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const deleteYear = _id => (dispatch, getState) => {
    axios.delete(`/api/v1/years/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DELETE_YEAR,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};
