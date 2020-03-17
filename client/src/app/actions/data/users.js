import { 
    SETTINGS_REQUESTED,
    PROFILE_RETURNED, PROFILE_UPDATED,
    PASSWORD_UPDATED,
    PREFERENCES_RETURNED, PREFERENCES_UPDATED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: SETTINGS_REQUESTED
    };
};

export const editProfile = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/users/profile"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: PROFILE_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "SETTINGS_ERROR")
    ));
};

export const updateProfile = profile => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.put("/api/v1/users/profile", profile/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: PROFILE_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "SETTINGS_ERROR")
    ));
};

export const updatePassword = password => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put("/api/v1/users/password", password/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: PASSWORD_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "SETTINGS_ERROR")
    ));
};

export const editPreferences = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/users/preferences"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: PREFERENCES_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "SETTINGS_ERROR")
    ));
};

export const updatePreferences = preferences => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put("/api/v1/users/preferences", preferences/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: PREFERENCES_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "SETTINGS_ERROR")
    ));
};