import { 
    PROCESSING_ASSESSMENTS, PROCESSING_ASSESSMENTS_FAILED,
    NEW_ASSESSMENT, CREATE_ASSESSMENT,
    FETCH_ASSESSMENTS, FETCH_PAST_ASSESSMENTS,
    EDIT_ASSESSMENT, UPDATE_ASSESSMENT, DELETE_ASSESSMENT
} from "../../actions/types";

const initialState = {
    loading: false,
    assessments: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_ASSESSMENTS:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_ASSESSMENTS_FAILED:
            return {
                ...state,
                loading: false
            };
        case NEW_ASSESSMENT:
            return {
                ...state,
                loading: false,
                courses: action.payload
            };
        case CREATE_ASSESSMENT:
            return {
                ...state,
                loading: false,
                assessments: [...state.assessments, action.payload]
            };
        case FETCH_ASSESSMENTS:
        case FETCH_PAST_ASSESSMENTS:
            return {
                ...state,
                loading: false,
                assessments: action.payload
            };
        case EDIT_ASSESSMENT:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.map(assessment => {
                    const { _id } = action.payload;

                    if(assessment._id !== _id) {
                        return assessment;
                    } else return {
                        assessment: action.payload
                    };
                })
            };
        case UPDATE_ASSESSMENT:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.map(assessment => {
                    const { _id, term, course, title, type, start, end, location, weight, score } = action.payload;
                    
                    if(assessment._id !== _id) {
                        return assessment;
                    } else {
                        return {
                            ...state.assessments,
                            assessment: {
                                _id,
                                term,
                                course,
                                title,
                                type,
                                date: {
                                    start,
                                    end
                                },
                                location,
                                grade: {
                                    weight,
                                    score
                                }
                            }
                        };
                    };  
                })
            };
        case DELETE_ASSESSMENT:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.filter(assessment => assessment._id !== action.payload)
            };
        default: 
            return state;
    };
};