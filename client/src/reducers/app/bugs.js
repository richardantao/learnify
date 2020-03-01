import { 
    BUGS_REQUESTED, BUGS_ERROR,
    BUG_CREATED,
    BUGS_FETCHED,
    BUG_RETURNED, BUG_UPDATED, BUG_DELETED
} from "../../actions/types";

const initialState = {
    loading: false,
    bugs: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case BUGS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case BUGS_ERROR:
                return {
                    ...state,
                    loading: false
                };
        case BUG_CREATED:
            return {
                ...state,
                loading: false,
                bugs: [...state.bugs, action.payload]
            };
        case BUGS_FETCHED:
            return {
                ...state,
                loading: false,
                bugs: action.payload
            };
        case BUG_RETURNED:
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
        case BUG_UPDATED:
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
        case BUG_DELETED:
            return {
                ...state,
                bugs: state.bugs.filter(bug => bug._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};