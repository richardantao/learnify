import {
    NOTIFICATIONS_REQUESTED
} from "../types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: NOTIFICATIONS_REQUESTED
    };
};