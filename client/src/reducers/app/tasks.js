import {
    PROCESSING_TASKS, PROCESSING_TASKS_FAILED,
    FETCH_TASKS, FETCH_PAST_TASKS,
    NEW_TASK, CREATE_TASK, 
    EDIT_TASK, UPDATE_TASK, DELETE_TASK 
} from "../../actions/types";

const initialState = {
    loading: false,
    tasks: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_TASKS:
            return {
                ...state,
                loading: true
            };
        case PROCESSING_TASKS_FAILED:
            return {
                ...state,
                loading: false
            };
        case NEW_TASK:
            return {
                ...state,
                loading: false,
                courses: action.payload
            };
        case CREATE_TASK:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload]
            };
        case FETCH_TASKS:    
        case FETCH_PAST_TASKS:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            };
        case EDIT_TASK:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map(task => {
                    const { _id } = action.payload;

                    if(task._id !== _id) {
                        return {
                            ...state.tasks
                        };
                    } else return {
                        task: action.payload
                    };
                })
            };
        case UPDATE_TASK:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map(task => {
                    const { _id, term, course, title, type, deadline, completion, description } = action.payload;
                    
                    if(task._id !== _id) {
                        return task;
                    } else return {
                        ...state.tasks,
                        task: {
                            _id,
                            term,
                            course, 
                            title, 
                            type, 
                            deadline, 
                            completion, 
                            description
                        }
                    };
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            };
        default: 
            return state;
    };
};