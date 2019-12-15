import { PROCESSING_FORM, POST_CONTACT } from "../actions/types";

const initialState = {
    loading: false,
    contact: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_FORM:
            return {
                ...state,
                loading: true
            };
        case POST_CONTACT:
            return {
                ...state,
                loading: false,
                contact: action.payload
            };
        default:
            return state;
    };
}