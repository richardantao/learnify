import { PROCESSING_FORM, POST_CONTACT, CONTACT_ERROR } from "../../actions/types";

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
        case POST_CONTACT:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case CONTACT_ERROR: 
            return {
                ...state,
                loading: false,
                message: false                
            };
        default:
            return state;
    };
}