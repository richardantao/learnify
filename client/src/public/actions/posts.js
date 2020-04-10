import { POSTS_LOADING, POSTS_FETCHED } from "./types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: POSTS_FETCHED
    };
};

export const fetchPosts = () => dispatch => {
    dispatch(setLoading());

    axios.get("/api/v1/posts")
    .then(res => dispatch({

    }))
    .catch(err => {

    }); 
};