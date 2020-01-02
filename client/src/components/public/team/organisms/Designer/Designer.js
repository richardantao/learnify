import React, { Component } from "react";

import { connect } from "react-redux";
import { postDesigner } from "../../../../../actions/team/applications";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from "reactstrap";

import "../../Application.scss";

class Designer extends Component {
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
        postDesigner: PropTypes.func.isRequired,
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

        const { postDesigner } = this.props;
        const { first, last, email, city, resume } = this.state;

        const application = {
            name: {
                first,
                last
            },
            email,
            city,
            resume
        };

        postDesigner(application);

        this.toggle();
    };

    render() {
        const { modal, first, last, email, city, resume } = this.state;

        const isEnabled = regex.test(email);
        
        return (
            <>
                <Button href="#" onClick={this.toggle}>Apply Now</Button>

                <Modal isOpen={modal} className="roles-app">
                    <ModalHeader toggle={this.toggle}>
                        <h4>Visual Designer &ndash; Application</h4>
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
                                    </Col>
                                    <Col>
                                        <Label for="city" className="required">City</Label>
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
                                    
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h4>Links and Attachments</h4>
                                <Row>
                                    <Col>
                                        <Label for="resume" className="required">Resume</Label>
                                        <Input
                                            name="resume"
                                            type="file"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="portfolio" className="required">Portfolio</Label>
                                        <Input
                                            name="portfolio"
                                            type="url"
                                            placeholder="https://portfolioURL.com"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="linkedin">LinkedIn</Label>
                                        <Input
                                            name="linkedin"
                                            type="url"
                                            placeholder="https://linkedin/com/in/username"
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="other">Other</Label>
                                        <Input
                                            name=""
                                            type=""
                                            placeholder=""
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

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    application: state.application,
    error: state.error
});

const mapDispatchToProps = { postDesigner, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Designer);