import React from "react";
import { Button } from "reactstrap";

export default props => {
    return (
        <Button 
            href={props.href}
            className={props.class}
            type={props.type}
            onClick={props.onClick}
        >   
            {props.content}
        </Button>
    );
}; 