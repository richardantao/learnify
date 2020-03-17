import { 
    CLASSES_REQUESTED,
    COURSES_FETCHED, CLASS_CREATED, 
    CLASSES_FETCHED,
    CLASS_RETURNED, CLASS_UPDATED, CLASS_DELETED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";
/**
 * @return {Object} - action type
 */
export const setLoading = () => { 
    return { 
        type: CLASSES_REQUESTED
    }; 
};
/**
 * @param  {string} termId - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const newClass = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const createClass = newClass => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/classes", newClass/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

/**
 * @param  {} parent - 
 * @param  {} parentId - 
 * @param  {} query - 
 * @param  {} dispatch - 
 * @param  {} getState - 
 */
export const fetchClasses = (parent, parentId, query) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/${parent}/${parentId}/classes${query}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: CLASSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};
/**
 * @param  {string} id - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const editClass = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/classes/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};
/**
 * @param  {string} id - 
 * @param  {Object} body - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const updateClass = (id, body) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/classes/${id}`, body/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const deleteClass = id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.delete(`/api/v1/classes/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};