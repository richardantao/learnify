import React from "react";
import { Alert } from "reactstrap";

export default ({ color, message }) => { return <Alert color={color}> {message} </Alert> };