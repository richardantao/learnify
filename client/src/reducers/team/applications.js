import { PROCESSING_FORM, FORM_POSTED, FORM_FAILED } from "../actions/types";

const initialState = {
    loading: false,
    application: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_FORM:
            return {
                ...state,
                loading: true
            };
        case FORM_POSTED:
            return {
                ...state,
                loading: false,
                application: action.payload
            };
        case FORM_FAILED:
            return {
                ...state,
                loading: false,
                application: {}
            };
        default:
            return state;
    }
};