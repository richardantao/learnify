import React from "react";
import { Alert as Alrt} from "reactstrap";

const Alert = props => {
    return (
        <Alrt color={props.color}>
            {props.message}
        </Alrt>
    );
};

export default Alert;