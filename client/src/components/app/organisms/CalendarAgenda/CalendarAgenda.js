import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { fetchClasses, editClass } from "../../../../actions/app/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Col } from "reactstrap";

import "./CalendarAgenda.scss";

export default class CalendarAgenda extends Component{
	state = {

	};
	
	async componentDidMount() {
		
	}

	componentDidUpdate(prevProps, prevState) {

	};

	render() {
		return (
			<Col id="agenda">
			
			</Col>
		);
	};
};
