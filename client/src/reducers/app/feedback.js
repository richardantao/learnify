import { 
    FEEDBACK_REQUESTED, FEEDBACK_ERROR,
    FEEDBACK_CREATED,
    FEEDBACK_FETCHED,
    FEEDBACK_RETURNED, FEEDBACK_UPDATED, FEEDBACK_DELETED
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
        case FEEDBACK_CREATED:
            return {
                ...state,
                loading: false,
                feedback: [...state.feedback, action.payload]
            };
        case FEEDBACK_FETCHED:
            return {
                ...state,
                loading: false,
                feedback: action.payload
            };
        case FEEDBACK_RETURNED:
            return {
                ...state,
                loading: false,
                feedback: state.feedback.map(feedback => {
                    if(feedback._id !== action._id) {
                        return feedback;
                    } else return {
                        feedback: action.payload
                    };
                })
            };
        case FEEDBACK_UPDATED:
            return {
                ...state,
                loading: false,
                feedback: state.feedback.map(feedback => {
                    const {  } = action.payload;
                    if(feedback._id !== action._id) {
                        return feedback;
                    } else return {
                        ...state.feedback,
                        feedback: {
                            
                        }
                    };
                })
            };
        case FEEDBACK_DELETED:
            return {
                ...state,
                feedback: state.feedback.filter(feedback => feedback._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};