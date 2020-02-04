import React from "react";
import { Alert } from "reactstrap";

const Alert = props => {
    return (
        <Alert color={props.color}>
            {props.message}
        </Alert>
    );
};

export default Alert;