import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { Button, Col, Row } from "reactstrap";
import Select from "react-select";

import moment from "moment";

import { connect } from "react-redux";
import { fetchYears, editYear } from "../../../actions/data/years";
import { fetchTerms, editTerm } from "../../../actions/data/terms";
import { fetchCourses, editCourse } from "../../../actions/data/courses";
import { fetchClasses, editClass } from "../../../actions/data/classes";

import PropTypes from "prop-types";
import Loadable from "react-loadable";

/* Atoms */
import Header from "../../atoms/Header";
import Icon from "../../atoms/Icon";

/* Organisms */
import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import List from "../../organisms/List";

import "./Academics.scss";

class Academics extends Component {
	state = {
		activeTerm: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		year: PropTypes.object.isRequired,
		term: PropTypes.object.isRequired,
		course: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		fetchYears: PropTypes.func.isRequired,
		editYear: PropTypes.func.isRequired,
		fetchTerms: PropTypes.func.isRequired,
		editTerm: PropTypes.func.isRequired,
		fetchCourses: PropTypes.func.isRequired,
		editCourse: PropTypes.func.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired
	};

	async componentDidMount() {
		const { fetchYears } = this.props;
		await fetchYears();
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;

		if(error !== prevProps.error) {
			if(error.id === "YEARS_ERROR" || error.id === "TERMS_ERROR" || error.id === "COURSES_ERROR" || error.id === "CLASSES_ERROR") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			};
		};
	};

	render() {
		const { activeTerm } = this.state;
		const { 
			year: { years },
			term: { terms },
			course: { courses },
			classes: { classes },
			fetchTerms,
			editTerm,
			fetchCourses,
			editCourse,
			fetchClasses,
			editClass
		} = this.props;

		return (
			<>
				<Helmet>
					<meta name="description" content="User's Academics page."/>
					<meta name="keywords" content="Learnify, Academics, Years, Terms, Semester, Course, Courses, Class, Classes"/>
					<title>My Learnify | Academics</title>
				</Helmet>
				<Row id="beta">
					<Col
						xs="1"
						sm="1"
						md="1"
						lg="1"
						xl="1"
					>
						<AppNav/>
					</Col>
					<Col 
						id="academics"
						xs="11"
						sm="11"
						md="11"
						lg="11"
						xl="11"
					>
						<AuthNav/>
						<Row className="header">
							<Col>
								<Header header="Academics"/>
							</Col>
							<Col>
								<Select 
									options={years.map(({ _id, title }) => {
										return ({ 
											value: JSON.stringify(_id), 
											label: title 
										});
									})}	
								/>
								<YearEdit onClick={editYear()}/>
								<YearNew/>
							</Col>
						</Row>
						<Row className="body academics-body">
							<Col>
								<Row className="terms-header">
									<Col>
										<h4>Terms</h4>
									</Col>
									<Col>
										<TermNew/>
									</Col>
								</Row>
							</Col>
							<Col>
								<Row className="courses-header">
									<Col>	
										<h4>Courses</h4>
									</Col>
									<Col>
										<CourseNew/>
									</Col>
								</Row>
							</Col>
							<Col>
								<Row className="classes-header">
									<Col>
										<h4>Classes</h4>
									</Col>
									<Col>
										<ClassNew/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<List 
								id="terms"
								className="terms-list"
								data={years.map(year => {
									return (
										<Row key={year._id} className="academics-data" onClick={fetchTerms(year._id)}>
											<Col>
												<ul>
													<li>
														<Row className="years-data">
															<Col>
																{year.title}
															</Col>
															<Col>
																{ moment(year.date.start).startOf("year") !== moment(year.date.end).startOf("year") ? (
																	`${moment(year.date.start, "MMMM YYYY")} - ${moment(year.start.end, "MMMM YYYY, h:mm a")}` 
																): null }

																{year.date.start} - {year.date.end}
															</Col>
														</Row>
														<ul>
															{terms.map(term => {
																return (
																	<Row key={term._id} className="term-data" onClick={fetchCourses(term._id)}>
																		<Col>
																			<h4>{term.title}</h4>
																		</Col>
																		<Col>
																			<p>{term.date.start}</p>
																			<p>{term.date.end}</p>
																		</Col>
																		<Col>
																			<TermEdit onClick={editTerm(term._id)}/>
																		</Col>
																	</Row>
																);
															})}
														</ul>
													</li>
												</ul>
											</Col>
										</Row>
									);
								})}
								empty="There are no existing terms"
							/>
							<List 
								id="courses"
								className="courses-list"
								data={courses.map(({ _id, title, term, code, instructor }) => {
									return (
										<Row key={_id} className="course-data" onClick={fetchClasses("courses", _id, null)}>
											<Col>
												<h4>{title}</h4>
												<h5>{term.title}</h5>
											</Col>
											<Col>
												<p>{code}</p>
												<p>{instructor}</p>
											</Col>
											<Col>
												<CourseEdit onClick={editCourse(_id)}/>
											</Col>
										</Row>
									);
								})}
								empty="There are no existing courses"
							/>
							<List 
								id="classes"
								className="classes-list"
								data={classes.map(({ _id, title, course, location, date }) => {
									return (
										<Row key={_id} className="class-data">
											<Col>
												<h4>{title}</h4>
												<h5>{course.title}</h5>
											</Col>
											<Col>
												<p>{date}</p>
												<p>{location}</p>
											</Col>	
											<Col>
												<ClassEdit onClick={editClass(_id)}/>
											</Col>
										</Row>
									);
								})}
								empty="There are no existing classes"
							/>
							<List/>
						</Row>
					</Col>
				</Row>
			</>
		);
	};
};

const YearNew = Loadable({
	loader: () => import(/* webpackChunkName: "YearNew" */ "../../reactors/YearNew"),
	loading: () => <div></div>,
	delay: 300
});

const YearEdit = Loadable({
	loader: () => import(/* webpackChunkName: "YearEdit" */ "../../reactors/YearEdit"),
	loading: () => <div></div>,
	delay: 300
});

const TermNew = Loadable({
	loader: () => import(/* webpackChunkName: "TermNew" */ "../../reactors/TermNew"),
	loading: () => <div></div>,
	delay: 300
});

const TermEdit = Loadable({
	loader: () => import(/* webpackChunkName: "TermEdit"*/ "../../reactors/TermEdit"),
	loading: () => <div></div>,
	delay: 300
});

const CourseNew = Loadable({
	loader: () => import(/* webpackChunkName: "CourseNew" */ "../../reactors/CourseNew"),
	loading: () => <div></div>,
	delay: 300
});

const CourseEdit = Loadable({
	loader: () => import(/* webpackChunkName: "CourseEdit" */ "../../reactors/CourseEdit"),
	loading: () => <div></div>,
	delay: 300
});

const ClassNew = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNew" */ "../../reactors/ClassNew"),
	loading: () => <div></div>,
	delay: 300
});

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	year: state.year,
	term: state.term,
	course: state.course,
	classes: state.classes,
});

const mapDispatchToProps = { 
	fetchYears, editYear,
	fetchTerms, editTerm,
	fetchCourses, editCourse,
	fetchClasses, editClass 
};

export default connect(mapStateToProps, mapDispatchToProps)(Academics);