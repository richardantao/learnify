import React, { Component } from "react";
import { Modal as Modl, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";

/* Molecules */

/* Atoms */
import Button from "../../atoms/Button";

import "./Modal.scss";

export default class Modal extends Component {
    /* State */
    state = {
        modal: false
    };

    /* Class functions */
    toggle = () => {
        const { modal } = this.state;

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {

    };

    handleSubmit = e => {
        e.preventDefault();

        const { formBody, actionFunc } = this.props;
        const { } = this.state; // might not be necessary

        // pass formBody to actionFunc
        actionFunc(formBody);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    /* Render */
    render() {
        const { modal } = this.state;
        const { type, header, body, footer } = this.props;

        /* UI */
        return  (
            <>
                <Button 
                    type="button"
                    content="New Task"
                    onClick={null} 
                />

                <Modl isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {header}
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {body}
                        </ModalBody>
                        <ModalFooter>
                            {footer}
                        </ModalFooter>
                    </Form>
                </Modl>
            </>  
        );
    };
};