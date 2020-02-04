import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { Row } from "reactstrap";

import AuthNav from "../../global/AuthNav";
import AppNav from "../../global/AppNav";
import CalendarHeader from "../CalendarHeader";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Calendar.scss";

export default class Calendar extends Component {
	state = {
		display: "week"
	};

	renderMonthView = () => {
		const { display } = this.state;

		this.setState({
			display: "month"
		});	
	};

	renderWeekView = () => {
		const { display } = this.state;

		this.setState({
			display: "week"
		});	
	};

	renderDayView = () => {
		const { display } = this.state;

		this.setState({
			display: "week"
		});	
	};

	renderAgendaView = () => {
		const { display } = this.state;

		this.setState({
			display: "agenda"
		});	
	};

	render() {
		const { display } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<title>My Learnify | Calendar</title>
				</Helmet>
				<div id="beta">
					<AuthNav/>
					<AppNav />
					<div id="calendar">
						<Row className="header">
							<CalendarHeader/> 
							
						</Row>
						<Row className="body">
							{ display === "month" ? (
								<CalendarMonth/>
							): null }
							{ display === "week" ? (
								<CalendarWeek/>
							): null }
							{ display === "day" ? (
								<CalendarDay/>
							): null }
							{ display === "agenda" ? (
								<CalendarAgenda/>
							): null }
						</Row>
					</div>
				</div>
			</>
		);
	}
};

const CalendarMonth = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../CalendarMonth"),
	loading: Loading, 
	delay: 300
});

const CalendarWeek = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../CalendarWeek"),
	loading: Loading,
	delay: 300
});

const CalendarDay = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarDay" */ "../CalendarDay"),
	loading: Loading,
	delay: 300
});

const CalendarAgenda = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarAgenda" */ "../CalendarAgenda"),
	loading: Loading,
	delay: 300
});

const ClassEditModal = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEditModal" */ "../../classes/ClassEditModal"),
	loading: Loading,
	delay: 300
});

const ClassNewModal = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNewModal" */ "../../classes/ClassNewModal"),
	loading: Loading,
	delay: 300
});