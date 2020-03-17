import { ACTIVE_TERM_REQUESTED, ACTIVE_TERM_FAILED, ACTIVE_TERM_SET } from "../../actions/types";

const initialState = {
    loading: false,
    activeTerm: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTIVE_TERM_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case ACTIVE_TERM_FAILED:
            return {
                ...state,
                loading: false
            };
        case ACTIVE_TERM_SET:
            return {
                ...state,
                loading: false,
                activeTerm: action.payload 
            };
        default: 
            return state;
    };
};