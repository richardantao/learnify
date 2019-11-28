import { 
    LOADING_ASSESSMENTS, 
    FETCH_ASSESSMENTS, FETCH_PAST_ASSESSMENTS,
    EDIT_ASSESSMENT, 
    NEW_ASSESSMENT, CREATE_ASSESSMENT, 
    UPDATE_ASSESSMENT, DELETE_ASSESSMENT 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_ASSESSMENTS
    };
};

export const fetchAssessments = () => dispatch => {
    dispatch(setLoading());
    
    axios.get("/planner")
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPastAssessments = () => dispatch => {
    dispatch(setLoading());

    axios.get("/planner/past")
    .then(res => dispatch({
        type: FETCH_PAST_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newAssessment = courses => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/planner/assessments/new", courses, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createAssessment = newAssessment => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/planner/assessments/create", newAssessment, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editAssessment = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/planner/assessments/edit/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_ASSESSMENT,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateAssessment = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/planner/assessments/update/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_ASSESSMENT,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteAssessment = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/planner/assessments/delete/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_ASSESSMENT,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};