import { 
    PROPERTIES_REQUESTED,
    COUNTRIES_FETCHED, 
    REGIONS_FETCHED, 
    INSTITUTIONS_FETCHED, 
    SCHOOLS_FETCHED, 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROPERTIES_REQUESTED
    };
};

export const fetchCountries = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/countries"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COUNTRIES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROPERTIES_ERROR")   
    ));
};

export const fetchRegions = country => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/countries/${country}/regions`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: REGIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROPERTIES_ERROR")   
    ));
};

export const fetchInstitutions = region => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/regions/${region}/institutions`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: INSTITUTIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROPERTIES_ERROR")   
    ));
};

export const fetchSchools = institution => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/institutions/${institution}/schools`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: SCHOOLS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROPERTIES_ERROR")   
    ));
};