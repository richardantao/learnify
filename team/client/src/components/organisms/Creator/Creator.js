import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { postCreator } from "../../../actions/applications";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Col, Row,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input 
} from "reactstrap";

import "./Creator.scss";

class Creator extends Component {
    state = {
        modal: false,
        first: "",
        last: "",
        email: "",
        city: "",
        knowledge: "",
        strategy: "",
        importance: "",
        resume: null
    };

    static propTypes = {
        application: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postCreator: PropTypes.func.isRequired,
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

        const { postCreator } = this.props; 
        const { first, last, email, city, knowledge, strategy, importance, resume} = this.state;

        const application = {
            name: {
                first,
                last
            },
            email,
            city,
            knowledge,
            strategy,
            importance,
            resume
        };

        postCreator(application);

        this.toggle();
    };

    render() {
        const { modal, first, last, email, city, knowledge, strategy, importance, resume } = this.state;

        const isEnabled = first.length && last.length > 0 && regex.test(email) && city.length > 0
        && knowledge.length > 99 && strategy.length > 99 && importance.length > 49;

        const knowledgeMin = 75 - knowledge.length;
        const knowledgeMax = 500 - knowledge.length;

        const strategyMin = 75 - strategy.length;
        const strategyMax = 500 - strategy.length;

        const importanceMin = 50 - importance.length;
        const importanceMax = 400 - importance.length;

        return (
            <Fragment>
                <Button href="#creator" onClick={this.toggle}>Apply Now</Button>

                <Modal isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>
                        <h4>Content Creator &ndash; Application</h4>
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <h4>Personal</h4>
                                <Row>
                                    <Col>
                                        <Label for="first" className="required">First Name</Label>
                                        <Input
                                            name="first"
                                            type="text"
                                            placeholder="First name.."
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="last" className="required">Last Name</Label>
                                        <Input
                                            name="last"
                                            type="text"
                                            placeholder="Last name.."
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="email" className="required">Email</Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Email.."
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { email.length > 0 && !regex.test(email) ? (
                                            <small className="warning">Email must be a valid email address</small>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <Label for="city" className="required">City of Residence</Label>
                                        <Input
                                            name="city"
                                            type="text"
                                            placeholder="ex. London"
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
                                        <Label for="knowledge" className="required">What makes content successful?</Label>
                                        <Input
                                            name="knowledge"
                                            type="textarea"
                                            minLength={75}
                                            maxLength={500}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { knowledge.length > 0 && knowledge.length < 75 ? (
                                            <small className="warning">{knowledgeMin} characters required</small>
                                        ): knowledge.length > 74 ? (
                                            <small>{knowledgeMax} characters left</small>
                                        ): null }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="strategy" className="required">You have just published your content. How do you promote it?</Label>
                                        <Input
                                            name="strategy"
                                            type="textarea"
                                            minLength={75}
                                            maxLength={500}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { strategy.length > 0 && strategy.length < 75 ? (
                                            <small className="warning">{strategyMin} characters required</small>
                                        ): strategy.length > 74 ? (
                                            <small>{strategyMax} characters left</small>
                                        ): null }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="required">
                                            What are three things that are most important to you in a work setting?
                                        </Label>
                                        <Input
                                            name="importance"
                                            type="textarea"
                                            minLength={50}
                                            maxLength={400}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { importance.length > 0 && importance.length < 50 ? (
                                            <small className="warning">{importanceMin} characters required</small>
                                        ): importance.length > 49 ? (
                                            <small>{importanceMax} characters left</small>
                                        ): null }
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h4>Links and Attachments</h4>
                                <Row>
                                    <Col>
                                        <Label>Personal URL</Label>
                                        <Input
                                            name="other"
                                            type="url"
                                            placeholder="LinkedIn, blog, portfolio, etc."
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Label className="required">Resume </Label>
                                        <Input
                                            name="resume"
                                            type="file"
                                            onChange={this.handleChange}
                                        />
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

const mapDispatchToProps = { postCreator, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Creator);