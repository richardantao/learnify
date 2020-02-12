import React, { Component } from "react";

/* Redux Operations */
import { connect } from "react-redux";
import { createYear } from "../../../../actions/beta/years";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

/* */
import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class YearNew extends Component {
    state = {
        modal: false,
        title: "",
        start: "",
        end: "",
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        createYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    componentDidUpdate(prevProps) {
        const { error, /* isAuthenticated */ } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: ""})
            };
        } else {
            this.setState({ message: null });
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();
        this.setState({ modal: !modal });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, start, end } = this.state;
        const { createYear } = this.props;

        const year = {
            title,
            date: {
                start,
                end
            }
        };

        createYear(year);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({
            title: "",
            start: "",
            end: "",
            message: null
        });

        this.toggle();
    };

    render() {
        const { modal, title, start, end, message } = this.state;

        return (
            <>
                <Button href="/beta/academics/new-year" type="button" onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Academic Year
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Create Year
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {  message === "Year Created" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null}
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="start">Start Date</Label>
                                <Input
                                    name="start"
                                    type="date"
                                    value={start}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="end">End Date</Label>
                                <Input
                                    name="end"
                                    type="date"
                                    value={end}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit" className="">Create Year</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

const mapDispatchToProps = { createYear, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(YearNew);