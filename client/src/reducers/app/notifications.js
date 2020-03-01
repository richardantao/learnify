import { 
    PROCESSING_NOTIFICATIONS, PROCESSING_NOTIFICATIONS_FAILED 
} from "../../actions/types";

const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_NOTIFICATIONS:
            return {
                loading: true
            };
        case PROCESSING_NOTIFICATIONS_FAILED:
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
