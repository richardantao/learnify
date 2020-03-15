import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchClasses, editClass } from "../../../../actions/app/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import "./CalendarDay.scss";

class CalendarDay extends Component {	
	state = {

	};

	static propTypes = {
		error: PropTypes.object.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired
	};
	
	async componentDidMount() {
		
	};

	componentDidUpdate(prevProps, prevState) {
		const { } = this.state;
		const { } = this.props;
	};

	render() {
		const { } = this.state;

		return (
			<Col id="calendar-day">

			</Col>
		);
	};
};

const mapStateToProps = state => ({
	error: state.error,
	classes: state.classes
});

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);