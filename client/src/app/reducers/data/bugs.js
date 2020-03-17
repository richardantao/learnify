import { 
    BUGS_REQUESTED, BUGS_ERROR,
    BUG_SUBMITTED
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
        case BUG_SUBMITTED:
            return {
                ...state,
                loading: false,
                bugs: [...state.bugs, action.payload]
            };
        default: 
            return state;
    };
};