import { FORM_SUBMITTED, CONTACT_SUCCESS, CONTACT_FAILED } from "../../../actions/types";

const initialState = {
    loading: false,
    message: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FORM_SUBMITTED:
            return {
                ...state,
                loading: true
            };
        case CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case CONTACT_FAILED: 
            return {
                ...state,
                loading: false,
                message: false                
            };
        default:
            return state;
    };
}