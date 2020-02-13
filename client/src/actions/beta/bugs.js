import { 
    LOADING_BUGS, 
    CREATE_BUG, FETCH_BUGS,
    EDIT_BUG, UPDATE_BUG, DELETE_BUG
} from "../../actions/types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { return { type: LOADING_BUGS }};

export const createBug = bug => (dispatch, getState => {
    dispatch(setLoading());

    axios.post("/api/v1/bugs", bug, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_BUG,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
});

export const fetchBugs = () => (dispatch, getState) => {
    axios.get("/api/v1/bugs", tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_BUGS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const editBug = id => (dispatch, getState) => {
    axios.get(`/api/v1/bugs/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_BUG,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const updateBug = (id, bug) => (dispatch, getState) => {
    axios.put(`/api/v1/bugs/${id}`, bug, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_BUG,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const deleteBug = id => (dispatch, getState) => {
    axios.delete(`/api/v1/bugs/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_BUG,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};