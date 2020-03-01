import { FORM_SUBMITTED, INVITE_SUCCESS, INVITE_FAILED } from "../../actions/types";

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
        case INVITE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case INVITE_FAILED:
            return {
                ...state,
                loading: false,
                message: null
            };
        default:
            return state;
    };
}