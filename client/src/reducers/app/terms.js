import { 
    TERMS_REQUESTED, TERMS_ERROR,
    YEARS_FETCHED, TERM_CREATED,
    TERMS_FETCHED,
    TERM_RETURNED, TERM_UPDATED, TERM_DELETED, 
} from "../../actions/types";

const initialState = {
    loading: false,
    terms: [],
    years: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TERMS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case TERMS_ERROR:
            return {
                ...state,
                loading: false
            };
        case YEARS_FETCHED:
            return {
                ...state,
                loading: false,
                years: action.payload
            };
        case TERM_CREATED:
            return {
                ...state,
                loading: false,
                terms: [...state.terms, action.payload]
            };
        case TERMS_FETCHED:
            return {
                ...state,
                loading: false,
                terms: action.payload
            };
        case TERM_RETURNED:
            return {
                ...state,
                loading: false,
                terms: state.terms.map(term => {
                    const { _id } = action.payload; 

                    if(term._id !== _id) {
                        return term;
                    } else return {
                        term: action.payload
                    };
                })
            };
        case TERM_UPDATED:
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
        case TERM_DELETED:
            return {
                ...state,
                loading: false,
                terms: state.terms.filter(term => term._id !== action.payload)
            }; 
        default: 
            return state;
    };
};
