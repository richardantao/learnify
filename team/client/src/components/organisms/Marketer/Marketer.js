import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { postMarketer } from "../../../actions/applications";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from "reactstrap";

import "./Marketer.scss";

class Marketer extends Component {
    state = {
        modal: false,
        first: "",
        last: "",
        email: "",
        city: "",
        resume: null
    };

    static propTypes = {
        application: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postMarketer: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { postMarketer } = this.props;
        const { first, last, email, city, resume} = this.state;

        const application = {
            name: {
                first,
                last
            },
            email,
            city,
            resume
        };

        postMarketer(application);

        this.toggle();
    };

    render() {
        const { modal, first, last, email, city, resume } = this.state;
        
        const isEnabled = regex.test(email);

        return (
            <Fragment>
                <Button href="#marketer" onClick={this.toggle}>Apply Now</Button>

                <Modal isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>
                        <h4>Marketing Specialist &ndash; Application</h4>
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <h4>Personal</h4>
                                <Row>
                                    <Col>
                                        <Label for="first">First Name</Label>
                                        <Input
                                            name="first"
                                            type="text"
                                            placeholder="First name.."
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="last">Last Name</Label>
                                        <Input
                                            name="last"
                                            type="text"
                                            placeholder="Last name.."
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h4>Tell us about yourself</h4>
                                <Row>
                                    <Col>
                                    
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h4>Links and Attachments</h4>
                                <Row>
                                    <Col>
                                    
                                    </Col>
                                </Row>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" block disabled={!isEnabled}>Submit Application</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Fragment>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    application: state.application,
    error: state.error
});

const mapDispatchToProps = { postMarketer, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Marketer);