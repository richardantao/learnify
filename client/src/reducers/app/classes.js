import { 
    PROCESSING_CLASSES, FETCH_CLASSES_BY_TERM, FETCH_CLASSES_BY_COURSE, 
    NEW_CLASS, CREATE_CLASS, 
    EDIT_CLASS, UPDATE_CLASS, DELETE_CLASS 
} from "../../actions/types";

const initialState = {
    loading: false,
    classes: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROCESSING_CLASSES:
            return {
                ...state,
                loading: true
            };
        case NEW_CLASS: 
            return {
                ...state,
                loading: false,
                parents: action.payload
            };
        case CREATE_CLASS:
            return {
                ...state,
                loading: false,
                classes: [...state.classes, action.payload]
            };
        case FETCH_CLASSES_BY_TERM:
        case FETCH_CLASSES_BY_COURSE:
            return {
                ...state,
                loading: false,
                classes: action.payload
            };
        
        case EDIT_CLASS:
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
        case UPDATE_CLASS:
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
        case DELETE_CLASS:
            return {
                ...state,
                classes: state.classes.filter(deletedClass => deletedClass._id !== action.id),
                loading: false
            };
        default: 
            return state;
    };
};