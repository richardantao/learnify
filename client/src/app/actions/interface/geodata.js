import { 
    GEODATA_REQUESTED,
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
        type: GEODATA_REQUESTED
    };
};

export const fetchCountries = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/api/v1/geodata/countries"/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COUNTRIES_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "GEODATA_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "GEODATA_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "GEODATA_ERROR")
            );
        };
    });
};

export const fetchRegions = country => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/geodata/countries/${country}/regions`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: REGIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "GEODATA_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "GEODATA_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "GEODATA_ERROR")
            );
        };
    });
};

export const fetchInstitutions = region => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/geodata/regions/${region}/institutions`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: INSTITUTIONS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "GEODATA_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "GEODATA_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "GEODATA_ERROR")
            );
        };
    });
};

export const fetchSchools = institution => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/geodata/institutions/${institution}/schools`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: SCHOOLS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "GEODATA_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "GEODATA_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "GEODATA_ERROR")
            );
        };
    });
};