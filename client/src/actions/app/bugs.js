import { 
    BUGS_REQUESTED,
    BUG_CREATED,
    BUGS_FETCHED,
    BUG_RETURNED, BUG_UPDATED, BUG_DELETED
} from "../../actions/types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { 
    return { 
        type: BUGS_REQUESTED
    };
};

export const createBug = bug => (dispatch, getState => {
    dispatch(setLoading());

    axios.post("/api/v1/bugs", bug/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUG_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
});

export const fetchBugs = () => (dispatch, getState) => {
    axios.get("/api/v1/bugs"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUGS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
};

export const editBug = id => (dispatch, getState) => {
    axios.get(`/api/v1/bugs/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUG_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
};

export const updateBug = (id, bug) => (dispatch, getState) => {
    axios.put(`/api/v1/bugs/${id}`, bug/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUG_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
};

export const deleteBug = id => (dispatch, getState) => {
    axios.delete(`/api/v1/bugs/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: BUG_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "BUGS_ERROR")
    ));
};