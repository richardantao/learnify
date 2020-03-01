import { 
    COURSES_REQUESTED, COURSES_ERROR,
    TERMS_FETCHED, COURSE_CREATED,
    COURSE_RETURNED, COURSE_UPDATED, COURSE_DELETED, COURSES_FETCHED
} from "../../actions/types";

const initialState = {
    loading: false,
    courses: [],
    terms: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case COURSES_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case COURSES_ERROR:
            return {
                ...state,
                loading: false
            };
        case TERMS_FETCHED: 
            return {
                ...state,
                loading: false,
                terms: action.payload,
            };  
        case COURSE_CREATED:
            return {
                ...state,
                loading: false,
                courses: [...state.courses, action.payload]
            };
        case COURSES_FETCHED:
            return {
                ...state,
                loading: false,
                courses: action.payload                
            };
        case COURSE_RETURNED:
            return {
                ...state,
                loading: false,
                courses: state.courses.map(course => {
                    const { _id } = action.payload;
                    
                    if(course._id !== _id) {
                        return {
                            ...state.courses
                        }
                    } else return {
                        course: action.payload
                    };
                })
            };
        case COURSE_UPDATED:
            return {
                ...state,
                loading: false,
                courses: state.courses.map(course => {
                    const { _id, year, term, code, title, credit, instructor, theme } = action.payload;
                    
                    if(course._id === _id) {
                        return course;
                    } else return {
                        ...state.courses,
                        course: {
                            _id,
                            year,
                            term,
                            code,
                            title,
                            credit,
                            instructor,
                            theme
                        }
                    };  
                }),
            };
        case COURSE_DELETED:
            return {
                ...state,
                loading: false,
                courses: state.courses.filter(course => course.id !== action.payload),
            };
        default: 
            return state;
    };
};
