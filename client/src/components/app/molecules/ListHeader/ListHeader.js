import React from "react";
import { Col, Row } from "reactstrap";

export default ({ data }) => {
    return (
        <Row>
            <Col>
                {data}
            </Col>
        </Row>
    );
};