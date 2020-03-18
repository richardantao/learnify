import { 
    ACTIVE_TERM_REQUESTED, 
    ACTIVE_TERM_SET, 
    DEFAULT_DURATION_FETCHED,
    DEFAULT_CALENDAR_FETCHED, 
    START_TIME_FETCHED,
    START_DAY_FETCHED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: ACTIVE_TERM_REQUESTED
    };
};

export const setActiveTerm = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/years?setActiveTerm=true"/*, tokenConfig(getState)*/) // retrieve the yearId of the current year
    .then(res => {
        return axios.get(`/api/v1/years/${res.data}/terms?setActiveTerm=true`)
        .catch(err => {
            if(err.response) {
                dispatch(
                    returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
                );
            } else if(err.request) {
                dispatch(
                    returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
                );
            } else {
                dispatch(
                    returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
                );
            };
        });
    })
    .then(res => dispatch({
        type: ACTIVE_TERM_SET,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
            );
        };
    });
};

export const getStartTime = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/users/preferences/?time=fetch"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: START_TIME_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
            );
        };
    });
};

export const getStartDay = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/users/preferences/?day=fetch"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: START_DAY_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
            );
        };
    });
};

export const getDefaultDuration = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/users/preferences/?duration=fetch"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DEFAULT_DURATION_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
            );
        };
    });
};

export const getDefaultCalendar = () => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get("/api/v1/users/preferences/?calendar=fetch"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DEFAULT_CALENDAR_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ACTIVE_TERM_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ACTIVE_TERM_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ACTIVE_TERM_ERROR")
            );
        };
    });
};