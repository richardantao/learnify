import React, { Component } from "react";

import { Modal } from "reactstrap";

export default class Modal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        const { modal } = this.state;

        this.setState({
            modal: !modal
        });
    };

    render() {
        const { modal } = this.state;

        return  (
            <Modal isOpen={modal}>
    
            </Modal>
        );
    };
};