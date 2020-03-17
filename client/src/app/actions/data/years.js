import { 
    YEARS_REQUESTED,
    YEAR_CREATED,
    YEARS_FETCHED,
    YEAR_RETURNED, YEAR_UPDATED, YEAR_DELETED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

/**
 */
export const setLoading = () => {
    return {
        type: YEARS_REQUESTED
    };
};

/**
 * @param  {Object} year - 
 * @param  {function} dispatch
 * @param  {function} getState
 * @return {Object} - 
 */
export const createYear = year => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/years", year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_CREATED, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

/**
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const fetchYears = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/years"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEARS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

/**
 * @param  {string} - id belonging to the year to return
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - returns action type and payload
 */
export const editYear = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};
/**
 * @param  {string} id - id of the year to uppate
 * @param  {Object} year - object containing update data
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - returns action type and payload
 */
export const updateYear = (id, year) => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`/api/v1/years/${id}`, year/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};

/**
 * @param  {string} id - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - action type and payload
 */
export const deleteYear = id => (dispatch, getState) => {
    axios.delete(`/api/v1/years/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEAR_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "YEARS_ERROR")
    ));
};
