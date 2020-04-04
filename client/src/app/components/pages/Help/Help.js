import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

import { connect } from "react-redux";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Row } from "reactstrap";

import Loadable from "react-loadable";

class Help extends Component {
	state = {
		message: null
	};

	static propTypes = {
		clearErrors: PropTypes.func.isRequired
	};

	render() {
		const { } = this.state;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content="Help, FAQ"/>
					<title>My Learnify | Help</title>
				</Helmet>
				<Row id="help">
					{ isMobile ? 
						<MobileHelp/>
					: isTablet ? 
						<TabletHelp/>
					: 	<DesktopHelp/>
					}
				</Row>
			</>
		);
	};
};

const DesktopHelp = Loadable({
	loader: () => import(/* webpackChunkName: "DesktopHelp" */ "../../templates/DesktopHelp"),
	loading: () => <div></div>,
	delay: 300
});

const MobileHelp = Loadable({
	loader: () => import(/* webpackChunkName: "MobileHelp" */ "../../templates/MobileHelp"),
	loading: () => <div></div>,
	delay: 300
});

const TabletHelp = Loadable({
	loader: () => import(/* webpackChunkName: "TabletHelp" */ "../../templates/TabletHelp"),
	loading: () => <div></div>,
	delay: 300
});

const mapStateToProps = state => ({
	error: state.error
});

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Help);