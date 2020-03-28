import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { fetchClasses, editClass } from "../../../actions/data/classes";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import { } from "./CalendarAgenda.module.scss";

class CalendarAgenda extends Component{
	state = {
		message: null
	};

	static propTypes = {
		error: PropTypes.object.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};
	
	async componentDidMount() {
		const { clearErrors } = this.props;
		await clearErrors();		
	};

	componentDidUpdate(prevProps, prevState) {
		const { error } = this.props;
		
		if(error !== prevProps.error) {
			if(error.id === "") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			};
		};
	};

	render() {
		const { message } = this.state;

		return (
			<Col id="agenda">
			
			</Col>
		);
	};
};

const mapStateToProps = state => ({
	error: state.error
});

const mapDispatchToProps = { fetchClasses, editClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAgenda);