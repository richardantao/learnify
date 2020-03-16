import React from "react";
import { Col } from "reactstrap";
import Counter from "../../molecules/Counter";

import "./DashboardHeader.scss";

export default ({ heading, extra, type, count }) => { 
    return (
        <Col role="banner">
            <h3>{heading}</h3>
            {extra}
            <Counter type={type} count={count}/>
        </Col>   
    );
};