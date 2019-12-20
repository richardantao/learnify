import React, { Component } from "react";

import { connect } from "react-redux";
import { 
	fetchAssessmentsByTerm, fetchPastAssessmentsByTerm,
	fetchAssessmentsByCourse, fetchPastAssessmentsByCourse
} from "../../../actions/data/assessments.action";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import Moment from "react-moment";

import AssessmentEditModal from "../AssessmentEditModal";

import "./Assessments.scss";

class Assessments extends Component{
	state = {
		
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchAssessmentsByTerm: PropTypes.func.isRequired, 
		fetchPastAssessmentsByTerm: PropTypes.func.isRequired,
		fetchAssessmentsByCourse: PropTypes.func.isRequired, 
		fetchPastAssessmentsByCourse: PropTypes.func.isRequired, 
	};

	componentDidMount() {
		const { fetchAssessmentsByTerm } = this.props;
		
		fetchAssessmentsByTerm();
	};

	render() {
		const { assessments } = this.props.assessment;

		const assessmentRecords = assessments.map(({ _id, title, course, date, location}) => (
			<Row class="ass-record" key={_id}>
			<Col>
				<h5>{title}</h5>
				<h6>{course}</h6>			
			</Col>
			<Col>
				<p><Moment format="dddd, MMMM Do">{date}</Moment></p>
				<p>{location}</p>
			</Col>
			<Col>
				<AssessmentEditModal onClick={this.props.editAssessment.bind(this, _id)}/>
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
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	fetchAssessmentsByTerm, fetchPastAssessmentsByTerm,
	fetchAssessmentsByCourse, fetchPastAssessmentsByCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(Assessments);