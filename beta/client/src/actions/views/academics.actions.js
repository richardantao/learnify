import { } from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios"; 

const setLoading = () => {
    return {
        type: LOADING_ACADEMICS
    };
};

