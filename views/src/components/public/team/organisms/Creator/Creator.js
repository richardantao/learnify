import React, { Component } from "react";

import { connect } from "react-redux";
import { postCreator } from "../../../../../actions/team/applications";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { 
    Col, Row,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Tooltip
} from "reactstrap";

import "../../Application.scss";

class Creator extends Component {
    state = {
        modal: false,
        tooltipOpen: false,
        first: "",
        last: "",
        email: "",
        city: "",
        strategy: "",
        help: "",
        importance: "",
        resume: "",
        portfolio: "",
        linkedin: "",
        other: ""
    };

    static propTypes = {
        application: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postCreator: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({
            modal: !modal
        });
    };

    toggleTooltip = () => {
        const { tooltipOpen } = this.state;

        this.setState({
            tooltipOpen: !tooltipOpen
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
        const { first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other } = this.state;

        const application = {
            first,
            last,
            email,
            city,
            help,
            strategy,
            importance,
            resume,
            portfolio,
            linkedin,
            other
        };

        postCreator(application);

        this.toggle();
    };

    render() {
        const { modal, tooltipOpen,
            first, last, email, city, help, strategy, importance, resume, portfolio, linkedin, other 
        } = this.state;

        const isEnabled = first.length > 0 && last.length > 0 && regex.test(email) && city.length > 0 
            && strategy.length > 74 && help.length > 100 && importance.length > 49
            && resume.includes("drive.google.com/");
        
        const strategyMin = 75 - strategy.length;
        const strategyMax = 500 - strategy.length;

        const helpMin = 100 - help.length;
        const helpMax = 500 - help.length;
        
        const importanceMin = 50 - importance.length;
        const importanceMax = 400 - importance.length;

        return (
            <>
                <Button href="#creator" onClick={this.toggle}>Apply Now</Button>

                <Modal isOpen={modal} className="roles-app">
                    <ModalHeader toggle={this.toggle}>
                        <h4>Content Creator &ndash; Application</h4>
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit} className="application" enctype="multipart/form-data">
                        <ModalBody>
                            <FormGroup>
                                <h4>Personal</h4>
                                <Row>
                                    <Col>
                                        <Label for="first" className="required">First Name</Label>
                                        <Input
                                            name="first"
                                            type="text"
                                            value={first}
                                            placeholder="e.g. Jane"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="last" className="required">Last Name</Label>
                                        <Input
                                            name="last"
                                            type="text"
                                            value={last}
                                            placeholder="e.g. Doe"
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
                                            placeholder="e.g. janedoe@example.com"
                                            value={email}
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
                                            placeholder="e.g. London"
                                            value={city}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <h4>Tell us about yourself</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="strategy" className="required">You have just published your content. How do you promote it?</Label>
                                        <Input
                                            name="strategy"
                                            type="textarea"
                                            value={strategy}
                                            minLength={75}
                                            maxLength={500}
                                            rows={5}
                                            onChange={this.handleChange}
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
                                            Recall a recent event where you went out of your way to help someone else. 
                                            Include details about how you went about it, why you did it, and what difference your actions made.
                                        </Label>
                                        <Input
                                            name="help"
                                            type="textarea"
                                            value={help}
                                            minLength={100}
                                            maxLength={500}
                                            rows={5}
                                            onChange={this.handleChange}
                                        />
                                        { help.length > 0 && help.length < 100 ? (
                                            <small className="warning">{helpMin} characters required</small>
                                        ): help.length > 99 ? (
                                            <small>{helpMax} characters left</small>
                                        ): null}
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
                                            value={importance}
                                            minLength={50}
                                            maxLength={400}
                                            rows={5}
                                            onChange={this.handleChange}
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
                                        <Label className="required">Resume</Label>
                                        <FontAwesomeIcon icon={faInfoCircle} id="creator-resume-info"/>
                                        <Tooltip placement="right" isOpen={tooltipOpen} target="creator-resume-info" toggle={this.toggleTooltip}>
                                            <p>Don't have it online yet? No problem.</p>                                          
                                            <p>1. Place a copy of your resume into Google Drive.</p>
                                            <p>2. Right click the file and select 'Share'.</p>
                                            <p>
                                                3. Click 'Copy Link', or manually copy the link displayed, and paste the link into the Resume field below.
                                            </p>    
                                        </Tooltip>
                                        <Input
                                            name="resume"
                                            type="text"
                                            placeholder="https://drive.google.com/drive/folder/"
                                            value={resume}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { resume.length > 0 && !resume.includes("drive.google.com/") ? (
                                            <small className="warning">URL must point to a Google Drive folder.</small>
                                        ): null }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Personal URL</Label>
                                        <Input
                                            name="portfolio"
                                            type="text"
                                            placeholder="Blog, portfolio, etc."
                                            value={portfolio}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="linkedin">LinkedIn</Label>
                                        <Input
                                            name="linkedin"
                                            type="text"
                                            placeholder="https://linkedin.com/in/username"
                                            value={linkedin}
                                            onChange={this.handleChange}
                                        />
                                        { linkedin.length > 0 && !linkedin.includes("linkedin.com/in/") ? (
                                            <small className="warning">URL must contain 'linkedin.com/in/'</small>
                                        ): null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="other">Other</Label>
                                        <Input
                                            name="other"
                                            type="text"
                                            value={other}
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
            </>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    application: state.application,
    error: state.error
});

const mapDispatchToProps = { postCreator, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Creator);