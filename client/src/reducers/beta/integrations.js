import { 
    LOADING_INTEGRATIONS, FETCH_INTEGRATIONS, 
    EDIT_INTEGRATION, CREATE_INTEGRATION, 
    UPDATE_INTEGRATION, DELETE_INTEGRATION 
} from "../../actions/types";

const initialState = {
    integrations: [],
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_INTEGRATIONS:
            return {
                ...state,
                loading: true
            };
        case FETCH_INTEGRATIONS:
            return {
                ...state,
                loading: false
            };
        case EDIT_INTEGRATION:
            return {
                ...state,
                loading: false
            };
        case CREATE_INTEGRATION:
            return {
                ...state,
                integrations: action.payload,
                loading: false
            };
        case UPDATE_INTEGRATION:
            return {
                ...state,
                loading: false
            };
        case DELETE_INTEGRATION:
            return {
                ...state,
                integrations: state.integrations.filter(integration => integration._id !== action.payload),
                loading: false
            };
        default: 
            return state;
    };
};