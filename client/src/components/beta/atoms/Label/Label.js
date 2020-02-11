import React from "react";

import { Label } from "reactstrap";

export default props => {
    return <Label for={props.for}>{props.content}</Label>
};