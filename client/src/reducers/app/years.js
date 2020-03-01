import { 
    YEARS_REQUESTED, YEARS_ERROR,
    YEAR_CREATED,
    YEARS_FETCHED,
    YEAR_RETURNED, YEAR_UPDATED, YEAR_DELETED
} from "../../actions/types";

const initialState = {
    loading: false,
    years: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case YEARS_REQUESTED: 
            return {
                ...state,
                loading: true
            };
        case YEARS_ERROR:
            return {
                ...state,
                loading: false
            };
        case YEAR_CREATED:
            return {
                ...state,
                loading: false,
                years: [...state.years, action.payload]
            };
        case YEARS_FETCHED:
            return {
                ...state,
                loading: false,
                years: action.payload
            };
        case YEAR_RETURNED:
            return {
                ...state,
                loading: false,
                years: state.years.map(year => {
                    const { _id } = action.payload;

                    if(year._id !== _id) {
                        return {
                            ...state.years
                        }
                    } else return {
                        year: action.payload 
                    };
                })
            };
        case YEAR_UPDATED:
            return {
                ...state,
                loading: false,
                years: state.years.map(year => {
                    const { _id, title, start, end } = action.payload;

                    if(year._id !== _id) {
                        return year;
                    } else return {
                        ...state.years,
                        year: {
                            _id,
                            title,
                            date: {
                                start,
                                end
                            }
                        }
                    };
                })  
            };
        case YEAR_DELETED:
            return {
                ...state,
                loading: false,
                years: state.years.filter(year => year._id !== action.payload)
            };
        default: 
            return state;
    };
};