import { 
    FEEDBACK_REQUESTED, FEEDBACK_ERROR,
    FEEDBACK_SUBMITTED
} from "../../actions/types";

const initialState = {
    loading: false,
    feedback: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FEEDBACK_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case FEEDBACK_ERROR:
            return {
                ...state,
                loading: false
            };
        case FEEDBACK_SUBMITTED:
            return {
                ...state,
                loading: false,
                feedback: [...state.feedback, action.payload]
            };
        default: 
            return state;
    };
};