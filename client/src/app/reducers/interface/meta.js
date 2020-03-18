import { 
    ACTIVE_TERM_REQUESTED, ACTIVE_TERM_FAILED, ACTIVE_TERM_SET,
    START_TIME_FETCHED, START_DAY_FETCHED, DEFAULT_DURATION_FETCHED, DEFAULT_CALENDAR_FETCHED
} from "../../actions/types";

const initialState = {
    loading: false,
    activeTerm: null,
    startTime: null,
    startDay: null,
    defaultDuration: null,
    defaultCalendar: null,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTIVE_TERM_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case ACTIVE_TERM_FAILED:
            return {
                ...state,
                loading: false
            };
        case ACTIVE_TERM_SET:
            return {
                ...state,
                loading: false,
                activeTerm: action.payload 
            };
        case START_TIME_FETCHED:
            return {
                ...state,
                loading: false,
                startTime: action.payload 
            };
        case START_DAY_FETCHED:
            return {
                ...state,
                loading: false,
                startDay: action.payload 
            };
        case DEFAULT_DURATION_FETCHED:
            return {
                ...state,
                loading: false,
                defaultDuration: action.payload 
            };
        case DEFAULT_CALENDAR_FETCHED: 
            return {
                ...state,
                loading: false,
                defaultCalendar: action.payload 
            };
        default: 
            return state;
    };
};