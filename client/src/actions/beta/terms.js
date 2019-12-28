import { 
    LOADING_TERMS, 
    FETCH_TERMS, EDIT_TERM, 
    NEW_TERM, CREATE_TERM, 
    UPDATE_TERM, DELETE_TERM 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_TERMS
    };
};

export const newTerm = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("http://localhost:3000/v1/years"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: NEW_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createTerm = term => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("http://localhost:3000/v1/terms", term/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: CREATE_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchTerms = yearId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`http://localhost:3000/v1/years/${yearId}/terms`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_TERMS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editTerm = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`http://localhost:3000/v1/terms/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateTerm = (_id, term) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`http://localhost:3000/v1/terms/${_id}`, term/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteTerm = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`http://localhost:3000/v1/terms/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DELETE_TERM,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
