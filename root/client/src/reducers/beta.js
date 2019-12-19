import { PROCESSING_FORM, POST_INVITE, INVITE_ERROR } from "../actions/types";

const initialState = {
    loading: false,
    beta: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_FORM:
            return {
                ...state,
                loading: true
            };
        case POST_INVITE:
            return {
                ...state,
                loading: false,
                beta: action.payload
            };
        case INVITE_ERROR:
            return {
                ...state,
                loading: null,
                beta: {}
            };
        default:
            return state;
    };
}