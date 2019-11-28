import { COUNT_DATA } from "../../actions/types";

const initialState = {
    count: 0
};

export default (state = initialState, action) => {
    switch(action.type) {
        case COUNT_DATA:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state;
    };
};