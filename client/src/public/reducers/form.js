import { FORM_PROCESSING, FORM_SUCCESS, FORM_FAILED } from "../actions/types";

const initialState = {
    loading: false,
    message: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FORM_PROCESSING:
            return {
                ...state,
                loading: true
            };
        case FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case FORM_FAILED:
            return {
                ...state,
                loading: false,
                message: null
            };
        default:
            return state;  
    };
};
