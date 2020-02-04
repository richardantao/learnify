import React from "react";
import { Col } from "reactstrap";

const List = props => {
    return (
        <Col id={props.id} className={props.class}>
            {props.data}
        </Col>
    );
};

export default List;