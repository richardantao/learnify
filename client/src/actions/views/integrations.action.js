import { 
    LOADING_INTEGRATIONS, 
    FETCH_INTEGRATIONS, EDIT_INTEGRATION, 
    NEW_INTEGRATION, CREATE_INTEGRATION, 
    UPDATE_INTEGRATION, DELETE_INTEGRATION 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_INTEGRATIONS
    };
};

export const fetchIntegrations = () => dispatch => {
    dispatch(setLoading());

    axios.get("/settings/integrations")
    .then(res => dispatch({
        type: FETCH_INTEGRATIONS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editIntegration = id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/settings/integrations/edit/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_INTEGRATION,
        payload: id // verify
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newIntegration = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/settings/integrations/new", tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_INTEGRATION, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createIntegration = newIntegration => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/settings/integrations/create", newIntegration, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_INTEGRATION, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateIntegration = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/settings/integrations/update/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_INTEGRATION, 
        payload: id // verify
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteIntegration = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/settings/integrations/delete/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_INTEGRATION,
        payload: id 
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};