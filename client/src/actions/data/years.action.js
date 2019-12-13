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

// deprecated ?
// export const newYear = () => (dispatch, getState) => {
//     dispatch(setLoading());

//     axios.get("", tokenConfig(getState))
//     .then(res => dispatch({
//         type: NEW_YEAR, 
//         payload: res.data
//     }))
//     .catch(err => dispatch(
//         returnErrors(err.data, err.status)
//     ));
// };

export const createYear = year => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("http://localhost:3000/v1/years", year, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_YEAR, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchYears = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("http://localhost:3000/v1/years", tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_YEARS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editYear = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/years/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_YEAR,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateYear = (_id, year) => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`http://localhost:3000/v1/years/${id}`, year, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_YEAR,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteYear = _id => (dispatch, getState) => {
    axios.delete(`http://localhost:3000/v1/years/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_YEAR,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
