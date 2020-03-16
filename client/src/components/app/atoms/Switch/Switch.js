import React from "react";
import { ButtonGroup, Button } from "reactstrap";

export default ({ primaryRef, primaryText, secondaryRef, secondaryText, onClick }) => {
    return (
        <ButtonGroup>
            <Button href={primaryRef} onClick={onClick}>
                {primaryText}
            </Button>
            <Button href={secondaryRef} onClick={onClick}>
                {secondaryText}
            </Button>
        </ButtonGroup>
    );
};