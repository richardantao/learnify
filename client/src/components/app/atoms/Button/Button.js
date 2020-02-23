import React from "react";
import { Button } from "reactstrap";

export default ({ href, className, type, content }) => {
    return (
        <Button 
            href={href}
            className={className}
            type={type}
        >   
            {content}
        </Button>
    );
}; 