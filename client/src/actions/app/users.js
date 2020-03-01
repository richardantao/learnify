import { 
    PROCESSING_SETTINGS, 
    EDIT_PROFILE, UPDATE_PROFILE,
    EDIT_PASSWORD, UPDATE_PASSWORD,
    EDIT_PREFERENCES, UPDATE_PREFERENCES
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_SETTINGS
    };
};

export const editProfile = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/users/profile"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PROFILE_FAILED")
    ));
};

export const updateProfile = profile => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put("/api/v1/users/profile", profile/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PROFILE_FAILED")
    ));
};

export const editPassword = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/users/password"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_PASSWORD,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PASSWORD_FAILED")
    ));
};

export const updatePassword = password => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put("/api/v1/users/password", password/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PASSWORD_FAILED")
    ));
};

export const editPreferences = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/users/preferences"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_PREFERENCES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PREFERENCES_FAILED")
    ));
};

export const updatePreferences = preferences => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put("/api/v1/users/preferences", preferences/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_PREFERENCES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_PREFERENCES_FAILED")
    ));
};