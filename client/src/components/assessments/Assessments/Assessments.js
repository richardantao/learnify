import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchAssessments, fetchPastAssessments } from "../../../actions/data/assessments.action";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./Assessments.scss";

class Assessments extends Component{
	state = {
		
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchAssessments: PropTypes.func.isRequired, 
		fetchPastAssessments: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.fetchAssessments();
	};

	render() {
		const { assessments } = this.props.assessment;

		const assessmentRecords = assessments.map(({ _id, title, course, date, time, location}) => (
			<Row class="ass-record" key={_id}>
			<Col>
				<h5>{title}</h5>
				<h6>{course}</h6>			
			</Col>
			<Col>
				<p>{date}</p>
				<p>{time}</p>
				<p>{location}</p>
			</Col>
			<Col>
				<Button type="button" onClick={this.editAssessmentModal}><FontAwesomeIcon icon={faEdit}/></Button>
			</Col>
		</Row>
		));
		 
		return (
			<Col className="assessments-column">
				{assessmentRecords}
			</Col>
		);	
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	assessment: state.assessment
});

const mapDispatchToProps = { fetchAssessments, fetchPastAssessments };

export default connect(mapStateToProps, mapDispatchToProps)(Assessments);