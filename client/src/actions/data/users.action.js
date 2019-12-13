import { LOADING_SETTINGS, 
    FETCH_PROFILE, UPDATE_PROFILE, 
    FETCH_PASSWORD, UPDATE_PASSWORD,
    FETCH_PREFERENCES, UPDATE_PREFERENCES
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_SETTINGS
    };
};

export const fetchProfile = () => dispatch => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/users/profile`)
    .then(res => dispatch({
        type: FETCH_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateProfile = profile => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put(`http://localhost:3000/v1/users/profile`, profile, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPassword = () => dispatch => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/users/password`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_PASSWORD,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updatePassword = password => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`http://localhost:3000/v1/users/password`, password, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPreferences = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/users/preferences`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_PREFERENCES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updatePreferences = preferences => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`http://localhost:3000/v1/users/preferences`, preferences, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_PREFERENCES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
