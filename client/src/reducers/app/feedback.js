import { 
    PROCESSING_FEEDBACK, PROCESSING_FEEDBACK_FAILED, 
    CREATE_FEEDBACK, FETCH_FEEDBACK,
    EDIT_FEEDBACK, UPDATE_FEEDBACK, DELETE_FEEDBACK
} from "../../actions/types";

const initialState = {
    loading: false,
    feedback: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_FEEDBACK:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_FEEDBACK_FAILED:
            return {
                ...state,
                loading: false
            };
        case CREATE_FEEDBACK:
            return {
                ...state,
                loading: false,
                feedback: [...state.feedback, action.payload]
            };
        case FETCH_FEEDBACK:
            return {
                ...state,
                loading: false,
                feedback: action.payload
            };
        case EDIT_FEEDBACK:
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
        case UPDATE_FEEDBACK:
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
        case DELETE_FEEDBACK:
            return {
                ...state,
                feedback: state.feedback.filter(feedback => feedback._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};