import { LOADING_DASHBOARD, FETCH_DASH_ITEMS } from "../../actions/types";

const initialState = {
    dashClasses: [],
    dashTasks: [],
    dashEvaluations: [],
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_DASHBOARD:
            return {
                ...state,
                loading: true
            };
        case FETCH_DASH_ITEMS:
            return {
                ...state,
                dashClasses: action.payload.classes,
                dashTasks: action.payload.tasks,
                dashEvaluations: action.payload.evaluations,
                loading: false
            };
        default: 
            return state;
    };
};