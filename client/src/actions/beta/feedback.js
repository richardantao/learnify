import { 
    LOADING_FEEDBACK, 
    CREATE_FEEDBACK, FETCH_FEEDBACK,
    EDIT_FEEDBACK, UPDATE_FEEDBACK, DELETE_FEEDBACK
} from "../../actions/types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_FEEDBACK
    };
};

export const createBug = bug => (dispatch, getState => {
    dispatch(setLoading());

    axios.post("/api/v1/feedback", bug, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_FEEDBACK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
});

export const fetchfeedback = () => (dispatch, getState) => {
    axios.get("/api/v1/feedback", bug, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_FEEDBACK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editBug = id => (dispatch, getState) => {
    axios.get(`/api/v1/feedback/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_FEEDBACK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateBug = (id, bug) => (dispatch, getState) => {
    axios.put(`/api/v1/feedback/${id}`, bug, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_FEEDBACK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteBug = id => (dispatch, getState) => {
    axios.delete(`/api/v1/feedback/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_FEEDBACK,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};