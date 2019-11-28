import { 
    LOADING_ASSESSMENTS, FETCH_ASSESSMENTS, FETCH_PAST_ASSESSMENTS,
    NEW_ASSESSMENT, CREATE_ASSESSMENT, 
    EDIT_ASSESSMENT, UPDATE_ASSESSMENT, DELETE_ASSESSMENT
} from "../../actions/types";

const initialState = {
    loading: false,
    parents: [],
    assessments: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_ASSESSMENTS:
            return {
                ...state,
                loading: false
            };
        case FETCH_ASSESSMENTS:
            return {
                ...state,
                loading: false,
                assessments: action.payload
            };
        case FETCH_PAST_ASSESSMENTS:
            return {
                ...state,
                loading: false,
                assessments: action.payload
            };
        case NEW_ASSESSMENT:
            return {
                ...state,
                parents: action.payload,
                loading: false
            };
        case CREATE_ASSESSMENT:
            return {
                ...state,
                loading: false,
                assessments: [...state.assessments, action.payload]
            };
        case EDIT_ASSESSMENT:
            return {
                ...state,
                loading: false,
                parents: action.payload.parent,
                assessments: state.assessments.map(assessment => {
                    if(assessment._id !== action._id) {
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
                    const { Id, Title, title, type, start, end, location, weight, score } = action.payload;
                    if(assessment._id !== action._id) {
                        return assessment;
                    } else {
                        return {
                            ...state.assessments,
                            assessment: {
                                parent: {
                                    _id: Id,
                                    title: Title
                                },
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