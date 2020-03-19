import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";

export default class Switch extends Component {
    state = {
        past: false
    };

    componentDidUpdate(prevProps) {
        const { past } = this.props;

        if(past !== prevProps.past) {
            this.setState({ past });
        };
    };

    render() {
        const { primaryRef, primaryText, secondaryRef, secondaryText, past } = this.props;
        
        return (
            <ButtonGroup>
                { past ? 
                    <>
                        <Button href={primaryRef}>
                            {primaryText}
                        </Button>
                        <Button href={secondaryRef} className="active-switch">
                            {secondaryText}
                        </Button>
                    </>
                    : 
                    <>
                        <Button href={primaryRef}  className="active-switch">
                            {primaryText}
                        </Button>
                        <Button href={secondaryRef}>
                            {secondaryText}
                        </Button>
                    </>
                }
            </ButtonGroup>
        );
    };
};