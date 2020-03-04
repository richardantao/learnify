import {
    NOTIFICATIONS_REQUESTED, 
    NOTIFICATION_CREATED,
    NOTIFATIONS_FETCHED,
    NOTIFICATION_TOGGLED, NOTIFICATION_DELETED
} from "../types";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: NOTIFICATIONS_REQUESTED
    };
};

export const initiailizeNotification = notification => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/notifcations", notification, tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFICATION_CREATED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};

export const fetchNotifications = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/notifcations", tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFATIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};

export const toggleNotification = (id, notification) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/notifcations/${id}`, notification, tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFICATION_TOGGLED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};

export const deleteNotification = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/notifications/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFICATION_DELETED,
        payload: id
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};