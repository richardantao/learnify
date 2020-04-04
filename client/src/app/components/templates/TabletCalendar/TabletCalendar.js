import React from "react";

import moment from "moment";

import { Row, Col } from "reactstrap";

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

/* Organisms */
import CalendarHeader from "../../organisms/CalendarHeader";

import "./TabletCalendar.scss";

export default ({ display }) => {
    return (
        <Col>
            <Row className="header">
                <CalendarHeader/> 
            </Row>
            <Row className="body">
                {display}
            </Row>
        </Col>
    );
};

const CalendarMonth = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../../organisms/CalendarMonth"),
	loading: Loading, 
	delay: 300
});

const CalendarWeek = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarMonth" */ "../../organisms/CalendarWeek"),
	loading: Loading,
	delay: 300
});

const CalendarDay = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarDay" */ "../../organisms/CalendarDay"),
	loading: Loading,
	delay: 300
});

const CalendarAgenda = Loadable({
	loader: () => import(/* webpackChunkName: "CalendarAgenda" */ "../../organisms/CalendarAgenda"),
	loading: Loading,
	delay: 300
});

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: Loading,
	delay: 300
});

const ClassNew = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNew" */ "../../reactors/ClassNew"),
	loading: Loading,
	delay: 300
});