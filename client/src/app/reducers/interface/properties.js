import { 
    PROPERTIES_REQUESTED, PROPERTIES_ERROR,
    COUNTRIES_FETCHED, REGIONS_FETCHED, INSTITUTIONS_FETCHED, SCHOOLS_FETCHED
} from "../../actions/types";

const initialState = {
    loading: false,
    countries: [],
    regions: [],
    institutions: [],
    schools: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROPERTIES_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case PROPERTIES_ERROR:
            return {
                ...state,
                loading: false
            };
        case COUNTRIES_FETCHED:
            return {
                ...state,
                loading: false,
                countries: action.payload
            };
        case REGIONS_FETCHED:
            return {
                ...state,
                loading: false,
                regions: action.payload
            };
        case INSTITUTIONS_FETCHED:
            return {
                ...state,
                loading: false,
                institutions: action.payload
            };
        case SCHOOLS_FETCHED:
            return {
                ...state,
                loading: false,
                schools: action.payload           
            };
        default:
            return state;
    };
};