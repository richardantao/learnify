import React, { Component } from "react";
import { Modal as Modl, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

/* Molecules */
import Form from "../../molecules/Form";

/* Atoms */
import Button from "../../atoms/Button";

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

    /* Render */
    render() {
        const { modal } = this.state;
        const { header, body, footer} = this.props;

        /* UI */
        return  (
            <>
                <Button 
                    type="button"
                    content="New Task"
                    onClick={true} 
                />

                <Modl isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {header}
                    </ModalHeader>
                    <Form>
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