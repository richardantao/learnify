import { POSTS_LOADING, POSTS_ERROR, POSTS_FETCHED } from "../actions/types";

const initialState = {
    loading: false,
    posts: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case POSTS_ERROR:
            return {
                ...state,
                loading: false
            };
        case POSTS_FETCHED:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        default:
            return state; 
    };
};