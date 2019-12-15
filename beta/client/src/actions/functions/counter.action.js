import { COUNT_DATA } from "../types";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const countData = () => dispatch => {
    axios.get("/dashboard")
    .then(res => dispatch({
        type: COUNT_DATA,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));    
};