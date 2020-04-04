import React from "react";

import moment from "moment";

import { Row, Col } from "reactstrap";

import Select from "react-select";

/* Atoms */
import Header from "../../atoms/Header";
import Icon from "../../atoms/Icon";

/* Organisms */
import List from "../../organisms/List";

import "./DesktopAcademics";

export default ({
	years, terms, courses, classes,
	editYear,
	fetchTerms, editTerm,
	fetchCourses, editCourse,
	fetchClasses, editClass
}) => {
    return (
        <Col>
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
					noHeader={true}
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
					noHeader={true}
					data={courses.map(({ _id, title, term, code, instructor }) => {
						return (
							<Row key={_id} className="course-data" onClick={fetchClasses("courses", _id, "")}>
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
					noHeader={true}
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
    );
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