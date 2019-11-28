import { 
    LOADING_COURSES, FETCH_COURSES, 
    NEW_COURSE, CREATE_COURSE, 
    EDIT_COURSE, UPDATE_COURSE, DELETE_COURSE 
} from "../../actions/types";

const initialState = {
    loading: false,
    parents: [],
    courses: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_COURSES:
            return {
                ...state,
                loading: true
            };
        case FETCH_COURSES:
            return {
                ...state,
                loading: false,
                courses: action.payload                
            };
        case NEW_COURSE: 
            return {
                ...state,
                loading: false,
                parents: action.payload
            };  
        case CREATE_COURSE:
            return {
                ...state,
                loading: false,
                courses: [...state.courses, action.payload]
            };
        case EDIT_COURSE:
            return {
                ...state,
                loading: false,
                courses: state.courses.map(course => {
                    if(course._id === action._id) {
                        return {
                            ...state.courses
                        }
                    } else return {
                        course: action.payload
                    };
                })
            };
        case UPDATE_COURSE:
            return {
                ...state,
                loading: false,
                courses: state.courses.map(course => {
                    const { Id, Title, code, title, credit, instructor, theme } = action.payload;
                    if(course._id === action._id) {
                        return course;
                    } else return {
                        ...state.courses,
                        course: {
                            parent: {
                                _id: Id,
                                title: Title
                            },
                            code,
                            title,
                            credit,
                            instructor,
                            theme
                        }
                    };  
                }),
            };
        case DELETE_COURSE:
            return {
                ...state,
                loading: false,
                courses: state.courses.filter(course => course.id !== action.payload),
            };
        default: 
            return state;
    };
};
