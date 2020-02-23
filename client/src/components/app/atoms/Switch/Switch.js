import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";

export default class Switch extends Component {
    state = {
        primary: true
    };

    toggle = () => {
        const { primary } = this.state;

        this.setState({
            primary: !primary
        });
    };

    render() {
        const { primary } = this.state;
        const { primaryText, secondaryText } = this.props;

        return (
            <ButtonGroup>
                <Button onClick={}>
                    {primaryText}
                </Button>
                <Button onClick={}>
                    {secondaryText}
                </Button>
            </ButtonGroup>
        );
    };
};