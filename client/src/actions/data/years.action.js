import { 
    LOADING_YEARS, FETCH_YEARS, 
    NEW_YEAR, CREATE_YEAR, 
    EDIT_YEAR, UPDATE_YEAR, DELETE_YEAR 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_YEARS
    };
};

export const fetchYears = () => dispatch => {
    dispatch(setLoading());

    axios.get("/academics")
    .then(res => dispatch({
        type: FETCH_YEARS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newYear = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/academics/years/new", tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_YEAR, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createYear = newYear => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/academics/years/create", newYear, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_YEAR, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editYear = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/academics/years/edit/${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_YEAR,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateYear = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`/academics/years/update/${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_YEAR,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteYear = _id => (dispatch, getState) => {
    axios.delete(`/academics/years/delete/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_YEAR,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
