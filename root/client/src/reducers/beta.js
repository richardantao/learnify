import { PROCESSING_FORM, POST_INVITE } from "../actions/types";

const initialState = {
    loading: false,
    beta: {}
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
        default:
            return state;
    };
}