import React from "react";
import Button from "reactstrap/button";

const Button = props => {
    return (
        <Button 
            href={props.href}
            className={props.class}
        >   
            {props.text}
        </Button>
    );
};  

export default Button;