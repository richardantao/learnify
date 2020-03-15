import React, { Component } from "react";

import { Button as Btn } from "reactstrap";

export default class Button extends Component {
    state = {
        open: false
    };

    toggle = () => {
        const { open } = this.state;
        this.setState({ open: !open });
    };

    render() {
        const { title, modal } = this.props;

        return (
            <>
                <Btn onClick={this.toggle}>
                    {title}
                </Btn>
    
                {modal}
            </>
        );
    };
};