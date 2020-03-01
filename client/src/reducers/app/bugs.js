import { 
    PROCESSING_BUGS, PROCESSING_BUGS_FAILED,
    CREATE_BUG, FETCH_BUGS,
    EDIT_BUG, UPDATE_BUG, DELETE_BUG
} from "../../actions/types";

const initialState = {
    loading: false,
    bugs: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_BUGS:
        case PROCESSING_BUGS_FAILED:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_BUGS_FAILED:
                return {
                    ...state,
                    loading: false
                };
        case CREATE_BUG:
            return {
                ...state,
                loading: false,
                bugs: [...state.bugs, action.payload]
            };
        case FETCH_BUGS:
            return {
                ...state,
                loading: false,
                bugs: action.payload
            };
        case EDIT_BUG:
            return {
                ...state,
                loading: false,
                bugs: state.bugs.map(bug => {
                    if(bug._id !== action._id) {
                        return bug;
                    } else return {
                        bug: action.payload
                    };
                })
            };
        case UPDATE_BUG:
            return {
                ...state,
                loading: false,
                bugs: state.bugs.map(bug => {
                    const {  } = action.payload;
                    if(bug._id !== action._id) {
                        return bug;
                    } else return {
                        ...state.bugs,
                        bug: {
                            
                        }
                    };
                })
            };
        case DELETE_BUG:
            return {
                ...state,
                bugs: state.bugs.filter(bug => bug._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};