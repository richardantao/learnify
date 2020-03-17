import React, { Component } from "react";
import { Modal as Modl, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";

import { connect } from "react-redux";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Molecules */

/* Atoms */
import Button from "../../atoms/Button";

import "./Modal.scss";

class Modal extends Component {
    

    render() {
        const { label, header, body, footer, handleSubmit } = this.props;
        const { modal } = this.state;

        return  (
            <>
                <Button 
                    type="button"
                    content={label}
                    onClick={this.toggle} 
                />

                <Modl isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{header}</ModalHeader>
                    <Form onSubmit={handleSubmit}>
                        <ModalBody>{body}</ModalBody>
                        <ModalFooter>{footer}</ModalFooter>
                    </Form>
                </Modl>
            </>  
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
}); 

const mapDispatchToProps = { clearErrors }; 

export default connect(mapStateToProps, mapDispatchToProps)(Modal);