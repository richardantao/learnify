import { PROCESSING_NOTIFICATIONS } from "../../actions/types";

const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_NOTIFICATIONS:
            return {
                loading: true
            };
        case bar: 
            return {

            };
        default: 
            return state;
    };
};
