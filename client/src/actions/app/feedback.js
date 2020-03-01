import { 
    FEEDBACK_REQUESTED, FEEDBACK_ERROR,
    FEEDBACK_CREATED,
    FEEDBACK_FETCHED,
    FEEDBACK_RETURNED, FEEDBACK_UPDATED, FEEDBACK_DELETED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { 
    return { 
        type: FEEDBACK_REQUESTED
    }; 
};

export const createBug = bug => (dispatch, getState => {
    dispatch(setLoading());

    axios.post("/api/v1/feedback", bug/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
});

export const fetchfeedback = () => (dispatch, getState) => {
    axios.get("/api/v1/feedback"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
};

export const editBug = id => (dispatch, getState) => {
    axios.get(`/api/v1/feedback/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
};

export const updateBug = (id, bug) => (dispatch, getState) => {
    axios.put(`/api/v1/feedback/${id}`, bug/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
};

export const deleteBug = id => (dispatch, getState) => {
    axios.delete(`/api/v1/feedback/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FEEDBACK_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "FEEDBACK_ERROR")
    ));
};