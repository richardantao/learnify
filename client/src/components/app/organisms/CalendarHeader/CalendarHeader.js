import React, { Component } from "react";

import { connect } from "react-redux";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Button, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./CalendarHeader.scss";

class CalendarHeader extends Component {
    state = {

    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
    };

    prevPeriod = () => {

	};

	nextPeriod = () => {

	};
    
    render() {
        return (
            <>
                <Col>
                    <h1>Calendar</h1>
                </Col>
                <Col className="header-date">
                    <Button onClick={this.prevPeriod}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </Button>
                    <h4>{this.props.date}</h4>
                    <Button onClick={this.nextPeriod}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </Button>
                </Col>
                <Col className="calendar-selector">
                    <Button>{this.props.display}</Button>
                </Col>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader);