import { 
    CLASSES_REQUESTED,
    COURSES_FETCHED, CLASS_CREATED, 
    CLASSES_FETCHED,
    CLASS_RETURNED, CLASS_UPDATED, CLASS_DELETED, CLASSES_ERROR
} from "../../actions/types";

const initialState = {
    loading: false,
    classes: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CLASSES_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case CLASSES_ERROR:
            return {
                ...state,
                loading: false
            };
        case COURSES_FETCHED: 
            return {
                ...state,
                loading: false,
                parents: action.payload
            };
        case CLASS_CREATED:
            return {
                ...state,
                loading: false,
                classes: [...state.classes, action.payload]
            };
        case CLASSES_FETCHED:
            return {
                ...state,
                loading: false,
                classes: action.payload
            };
        
        case CLASS_RETURNED:
            return {
                ...state,
                loading: false,
                classes: state.classes.map(Class => {
                    if(Class._id !== action._id) {
                        return Class;
                    } else return {
                        Class: action.payload
                    };
                }),
                courses: action.payload.options
            };
        case CLASS_UPDATED:
            return {
                ...state,
                loading: false,
                classes: state.classes.map(Class => {
                    const { Id, Title, title, start, end, frequency, by, interval, location, description } = action.payload;
                    if(Class._id !== action._id) {
                        return Class;
                    } else return {
                        ...state.classes,
                        Class: {
                            parent: {
                                _id: Id,
                                title: Title
                            },	
                            title,
                            date: {
                                start,
                                end
                            },
                            frequency,
                            by,
                            interval,
                            location,
                            description
                        }
                    };
                })
            };
        case CLASS_DELETED:
            return {
                ...state,
                classes: state.classes.filter(deletedClass => deletedClass._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};