import { 
    NOTIFICATIONS_REQUESTED, NOTIFICATIONS_ERROR,
    NOTIFICATION_CREATED, 
    NOTIFATIONS_FETCHED,
    NOTIFICATION_TOGGLED, NOTIFICATION_DELETED
} from "../../actions/types";

const initialState = {
    loading: false,
    notifications: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case NOTIFICATIONS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case NOTIFICATIONS_ERROR:
            return {
                ...state,
                loading: false
            };
        case NOTIFICATION_CREATED: 
            return {
                ...state,
                loading: false,
                notifications: [...state.notifications, action.payload]
            };
        case NOTIFICATION_TOGGLED:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.map(notification => {
                    const { _id, } = action.payload;
                })
            };
        case NOTIFICATION_DELETED:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.filter(notification => notification._id !== action.payload )
            };
        default: 
            return state;
    };
};
