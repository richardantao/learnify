import { 
    NOTIFICATIONS_REQUESTED, NOTIFICATIONS_ERROR
} from "../../actions/types";

const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case NOTIFICATIONS_REQUESTED:
            return {
                loading: true
            };
        case NOTIFICATIONS_ERROR:
            return {
                loading: false
            };
        case bar: 
            return {

            };
        default: 
            return state;
    };
};
