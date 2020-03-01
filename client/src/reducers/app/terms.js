import { 
    PROCESSING_TERMS, PROCESSING_TERMS_FAILED,
    FETCH_TERMS,
    NEW_TERM, CREATE_TERM, 
    EDIT_TERM, UPDATE_TERM, DELETE_TERM 
} from "../../actions/types";

const initialState = {
    loading: false,
    terms: [],
    years: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_TERMS:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_TERMS_FAILED:
            return {
                ...state,
                loading: false
            };
        case NEW_TERM:
            return {
                ...state,
                loading: false,
                years: action.payload
            };
        case CREATE_TERM:
            return {
                ...state,
                loading: false,
                terms: [...state.terms, action.payload]
            };
        case FETCH_TERMS:
            return {
                ...state,
                loading: false,
                terms: action.payload
            };
        case EDIT_TERM:
            return {
                ...state,
                loading: false,
                terms: state.terms.map(term => {
                    const { _id } = action.payload; 

                    if(term._id !== _id) {
                        return {
                            ...state.terms
                        }
                    } else return {
                        term: action.payload
                    };
                })
            };
        case UPDATE_TERM:
            return {
                ...state,
                loading: false,
                terms: state.terms.map(term => {
                    const { _id, year, title, start, end } = action.payload;

                    if(term._id !== _id) {
                        return term;
                    } else return {
                        ...state.terms,
                        term: {
                            _id,
                            year,
                            title,
                            date: {
                                start,
                                end
                            }
                        }
                    };
                })
            };
        case DELETE_TERM:
            return {
                ...state,
                loading: false,
                terms: state.terms.filter(term => term._id !== action.payload)
            }; 
        default: 
            return state;
    };
};
