import React from "react";
import { Row, Col } from "reactstrap";

export default ({ data }) => { 
    return (
        <Row>
            <Col>
                {data}
            </Col>
        </Row>
    );
};