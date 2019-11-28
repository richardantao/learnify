import { 
    LOADING_TERMS, FETCH_TERMS,
    NEW_TERM, CREATE_TERM, 
    EDIT_TERM, UPDATE_TERM, DELETE_TERM 
} from "../../actions/types";

const initialState = {
    loading: false,
    parents: [],
    terms: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_TERMS:
            return {
                ...state,
                loading: true
            };
        case FETCH_TERMS:
            return {
                ...state,
                loading: false,
                terms: action.payload
            };
        case NEW_TERM:
            return {
                ...state,
                loading: false,
                terms: action.payload
            };
        case CREATE_TERM:
            return {
                ...state,
                terms: [...state.terms, action.payload],
                loading: false
            };
        case EDIT_TERM:
            return {
                ...state,
                loading: false,
                terms: state.terms.map(term => {
                    if(term._id !== action._id) {
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
                    const { Id, Title, title, start, end } = action.payload;
                    if(term._id !== action._id) {
                        return term;
                    } else return {
                        ...state.terms,
                        term: {
                            parent: {
                                _id: Id,
                                title: Title
                            },
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
