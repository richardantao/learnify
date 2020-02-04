import React from "react";
import { Button as Btn } from "reactstrap";

const Button = props => {
    return (
        <Btn 
            href={props.href}
            className={props.class}
            type={props.type}
            onClick={props.onClick}
        >   
            {props.content}
        </Btn>
    );
};  

export default Button;