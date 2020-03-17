import {
    NOTIFICATIONS_REQUESTED, 
    NOTIFICATION_CREATED,
    NOTIFATIONS_FETCHED,
    NOTIFICATION_TOGGLED, NOTIFICATION_DELETED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

/**
 * @return {Object} - action type
 */
export const setLoading = () => {
    return {
        type: NOTIFICATIONS_REQUESTED
    };
};

/**
 * @param  {Object} notification - object to send with POST request
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - action type and payload 
 */
export const initiailizeNotification = notification => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/notifications", notification, tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFICATION_CREATED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};

/**
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - action type and payload 
 */
export const fetchNotifications = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/notifications", tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFATIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};

/**
 * @param  {string} id -
 * @param  {Object} notification -
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - action type and payload 
 */
export const toggleNotification = (id, notification) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/notifications/${id}`, notification, tokenConfig(getState))
    .then(res => dispatch({
        type: NOTIFICATION_TOGGLED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.res.data, err.res.status, "NOTIFCATIONS_ERROR"));
    });
};
/**
 * @param  {string} id -
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - action type and payload 
 */
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