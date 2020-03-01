import { FORM_SUBMITTED, APPLICATION_SUCCESS, APPLICATION_FAILED } from "../../actions/types";
const initialState = {
    loading: false,
    application: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FORM_SUBMITTED:
            return {
                ...state,
                loading: true
            };
        case APPLICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                application: action.payload
            };
        case APPLICATION_FAILED:
            return {
                ...state,
                loading: false,
                application: {}
            };
        default:
            return state;
    }
};