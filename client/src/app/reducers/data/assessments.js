import { 
    ASSESSMENTS_REQUESTED, ASSESSMENTS_ERROR,
    COURSES_FETCHED, ASSESSMENT_CREATED,
    ASSESSMENTS_FETCHED,
    ASSESSMENT_RETURNED, ASSESSMENT_COMPLETION_TOGGLED, ASSESSMENT_UPDATED, ASSESSMENT_DELETED 
} from "../../actions/types";

const initialState = {
    loading: false,
    assessments: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ASSESSMENTS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case ASSESSMENTS_ERROR:
            return {
                ...state,
                loading: false
            };
        case COURSES_FETCHED:
            return {
                ...state,
                loading: false,
                courses: action.payload
            };
        case ASSESSMENT_CREATED:
            return {
                ...state,
                loading: false,
                assessments: [...state.assessments, action.payload]
            };
        case ASSESSMENTS_FETCHED:
            return {
                ...state,
                loading: false,
                assessments: action.payload
            };
        case ASSESSMENT_RETURNED:
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
        case ASSESSMENT_COMPLETION_TOGGLED:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.map(assessment => {
                    const { _id, completed } = action.payload;

                    if(assessment._id !== _id) {
                        return assessment;
                    } else return {
                        ...state.assessments,
                        assessment: {
                            _id,
                            completed: !completed
                        }
                    }
                })
            }
        case ASSESSMENT_UPDATED:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.map(assessment => {
                    const { _id, term, course, title, type, start, end, location, weight, score } = action.payload;
                    
                    if(assessment._id !== _id) {
                        return assessment;
                    } else return {
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
                })
            };
        case ASSESSMENT_DELETED:
            return {
                ...state,
                loading: false,
                assessments: state.assessments.filter(assessment => assessment._id !== action.payload)
            };
        default: 
            return state;
    };
};