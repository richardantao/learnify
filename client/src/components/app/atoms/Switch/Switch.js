import React from "react";
import { ButtonGroup, Button } from "reactstrap";

export default ({ primaryText, secondaryText, onClick }) => {
    return (
        <ButtonGroup>
            <Button onClick={onClick}>
                {primaryText}
            </Button>
            <Button onClick={onClick}>
                {secondaryText}
            </Button>
        </ButtonGroup>
    );
};