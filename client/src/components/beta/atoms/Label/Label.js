import React from "react";

import Label from "reactstrap/label";

const Label = props => {
    return <Label for={props.for}>{props.label}</Label>
};

export default Label;