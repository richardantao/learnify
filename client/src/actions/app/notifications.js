import {

} from "../types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: PROCESSING_NOTIFICATIONS
    };
};