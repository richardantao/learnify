import { combineReducers } from "redux";

import error from "./errors";
import form from "./form";

export default combineReducers({ error, form });