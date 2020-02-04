import React from "react";
import Moment from "react-moment";

const Today = props => { return <h4><Moment format="dddd, MMMM Do"></Moment></h4> };

export default Today;