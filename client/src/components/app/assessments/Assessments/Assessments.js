import React, { Component } from "react";

import { connect } from "react-redux";
import { 
	fetchAssessmentsByTerm, fetchPastAssessmentsByTerm,
	fetchAssessmentsByCourse, fetchPastAssessmentsByCourse,
	editAssessment
} from "../../../../actions/beta/assessments";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import Moment from "react-moment";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Assessments.scss";

class Assessments extends Component {
	state = {
		current: true
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		assessment: PropTypes.object.isRequired,
		fetchAssessmentsByTerm: PropTypes.func.isRequired, 
		fetchPastAssessmentsByTerm: PropTypes.func.isRequired,
		fetchAssessmentsByCourse: PropTypes.func.isRequired, 
		fetchPastAssessmentsByCourse: PropTypes.func.isRequired, 
		editAssessment: PropTypes.func.isRequired
	};

	componentDidMount() {
		const { fetchAssessmentsByTerm } = this.props;
		
		fetchAssessmentsByTerm();
	};

	toggleItemSwitch = () => {
		const { current } = this.state;

		this.setState({
			current: !current
		});
	};

	render() {
		const { 
			assessment: { assessments },
			editAssessment 
		} = this.props;

		const assessmentRecords = assessments.map(({ _id, title, course, type, location, date }) => (
			<Row class="assessment-record" key={_id}>
				<Col>
					<h5>{title}</h5>
					<h6>{course}</h6>			
				</Col>
				<Col>
					<p>{type}</p>
					<p>{location}</p>
					<p><Moment format="dddd, MMMM Do">{date}</Moment></p>
				</Col>
				<Col>
					<AssessmentEditModal onClick={editAssessment.bind(this, _id)}/>
				</Col>
			</Row>	
		));
		 
		return <Col id="assessments"> {assessmentRecords} </Col>
	};
};

const AssessmentEditModal = Loadable({
	loader: () => import(/* webpackChunkName: "AssessmentEditModal" */ "../AssessmentEditModal"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	assessment: state.assessment
});

const mapDispatchToProps = { 
	fetchAssessmentsByTerm, fetchPastAssessmentsByTerm,
	fetchAssessmentsByCourse, fetchPastAssessmentsByCourse,
	editAssessment
};

export default connect(mapStateToProps, mapDispatchToProps)(Assessments);