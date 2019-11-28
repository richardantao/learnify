import {
    LOADING_TASKS, FETCH_TASKS, FETCH_PAST_TASKS,
    NEW_TASK, CREATE_TASK, 
    EDIT_TASK, UPDATE_TASK, DELETE_TASK 
} from "../../actions/types";

const initialState = {
    loading: false,
    parents: [],
    tasks: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_TASKS:
            return {
                ...state,
                loading: true
            };
        case FETCH_TASKS:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            };
        case FETCH_PAST_TASKS:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            };
        case NEW_TASK:
            return {
                ...state,
                loading: false,
                parents: action.payload
            };
        case CREATE_TASK:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload]
            };
        case EDIT_TASK:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map(task => {
                    if(task._id !== action._id) {
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
                    const { Id, Title, title, type, deadline, completion, description } = action.payload;
                    if(task._id !== action._id) {
                        return task;
                    } else return {
                        ...state.tasks,
                        task: {
                            parent: {
                               _id: Id, 
                               title: Title
                            }, 
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