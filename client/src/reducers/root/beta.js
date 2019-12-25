import { PROCESSING_FORM, POST_INVITE, INVITE_ERROR } from "../actions/types";

const initialState = {
    loading: false,
    message: null
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
                message: action.payload
            };
        case INVITE_ERROR:
            return {
                ...state,
                loading: false,
                message: null
            };
        default:
            return state;
    };
}