import { 
    TASKS_REQUESTED, TASKS_ERROR,
    COURSES_FETCHED, TASK_CREATED,
    TASK_RETURNED, TASK_UPDATED, TASK_DELETED, TASKS_FETCHED
} from "../../actions/types";

const initialState = {
    loading: false,
    tasks: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TASKS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case TASKS_ERROR:
            return {
                ...state,
                loading: false
            };
        case COURSES_FETCHED:
            return {
                ...state,
                loading: false,
                courses: action.payload
            };
        case TASK_CREATED:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload]
            };
        case TASKS_FETCHED:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            };
        case TASK_RETURNED:
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
        case TASK_UPDATED:
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
        case TASK_DELETED:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            };
        default: 
            return state;
    };
};