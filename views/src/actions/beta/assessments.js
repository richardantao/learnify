import { 
    LOADING_ASSESSMENTS, 
    FETCH_ASSESSMENTS, FETCH_PAST_ASSESSMENTS,
    EDIT_ASSESSMENT, 
    NEW_ASSESSMENT, CREATE_ASSESSMENT, 
    UPDATE_ASSESSMENT, DELETE_ASSESSMENT 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_ASSESSMENTS
    };
};

export const newAssessment = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/terms/${termId}/courses`, tokenConfig(getState))
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

    axios.post(`http://localhost:8080/v1/assessments`, newAssessment, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchAssessments = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/assessments`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`http://localhost:8080/v1/terms/${termId}/assessments`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPastAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/terms/${termId}/assessments`, /*tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_PAST_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/terms/${courseId}/assessments`, /*tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

// add query to filter assessments
export const fetchPastAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/terms/${courseId}/assessments`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editAssessment = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:8080/v1/assessments/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_ASSESSMENT,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateAssessment = (_id, assessment) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`http://localhost:8080/v1/assessments/${_id}`, assessment/*, tokenConfig(getState)*/)
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

    axios.delete(`http://localhost:8080/v1/assessments/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DELETE_ASSESSMENT,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};