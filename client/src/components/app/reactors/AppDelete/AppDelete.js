import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { deleteProfile } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button, 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, Label, Input 
} from "reactstrap";

class AppDelete extends Component {
    state = {
        open: false
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        deleteProfile: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            // if() {

            // } else {

            // }
        } else {
            this.setState({

            });
        };
    };

    toggle = () => {
        const { open } = this.state;
        const { clearErrors } = this.props;

        clearErrors();

        this.setState({
            open: !open
        });
    };

    handleChange = e => {

    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;
        const { deleteProfile } = this.props;

        // pass id of user to deleteProfile
        // deleteProfile(id);
    };  

    render() {
        const { open } = this.state;

        return (
            <>
                <Helmet>
                    <title>My Learnify | Delete Account</title>
                </Helmet>
                <Button>Delete Account</Button>
                
                <Modal isOpen={open}>
                    <ModalHeader toggle={this.toggle}>Delete Account</ModalHeader>

                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { deleteProfile, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppDelete);