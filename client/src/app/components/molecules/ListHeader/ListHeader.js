import React from "react";
import { Col, Row } from "reactstrap";

export default ({ header, action }) => {
    return (
        <Row>
            <Col>
                <h2>{header}</h2>
            </Col>
            <Col>
                {action}
            </Col>
        </Row> 
       
    );
};