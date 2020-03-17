import React from "react";
import moment from "moment";

export default () => { 
    return <h4>{moment().format("dddd, MMMM Do")}</h4>
};