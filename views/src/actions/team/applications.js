import { 
    PROCESSING_FORM, FORM_POSTED, FORM_FAILED
} from "../types";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_FORM
    };
};

export const postBackend = application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/backend`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};

export const postCreator = application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/creator`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};

export const postDesigner= application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/designer`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};

export const postFrontend = application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/frontend`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};

export const postMarketer = application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/marketer`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};

export const postSwift = application => dispatch => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/applications/swift`, application)
    .then(res => dispatch({
        type: FORM_POSTED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, FORM_FAILED)
    ));
};
