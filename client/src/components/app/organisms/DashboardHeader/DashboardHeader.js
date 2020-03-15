import React from "react";
import { Col } from "reactstrap";
import Counter from "../../molecules/Counter";

import "./DashboardHeader.scss";

export default props => { 
    return (
        <Col role="banner" className={props.class}>
            <h3>{props.heading}</h3>
            {props.extra}
            <Counter type={props.type} count={props.count}/>
        </Col>   
    );
};