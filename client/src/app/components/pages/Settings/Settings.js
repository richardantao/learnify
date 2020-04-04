import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

import { connect } from "react-redux";
import { logout } from "../../../actions/auth/auth";
import PropTypes from "prop-types";

import { Row } from "reactstrap";

// Organisms
import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

class Settings extends Component {
	state = {
		form: null
	};

	static propTypes = {
		error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.setState({ form: <Profile/> });	
	};

	handleProfile = () => {
		this.setState({ form: <Profile/> });
	};

	handlePassword = () => {
		this.setState({ form: <Password/> });
	};

	handlePreferences = () => {
		this.setState({ form: <Preference/> });
	};

	handleLogout = () => {
		const { logout } = this.props;		
		logout();
	};

	render() {
		const { form } = this.state;
		const { error, logout } = this.props;

		return (
			<>
				<Helmet>
					<meta name="description" content=""/>
					<meta name="keywords" content=""/>
					<title>My Learnify | Settings</title>
				</Helmet>
				<Row id="settings">
					{ isMobile ? 
						<MobileSettings
							error={error}
							form={form}
							logout={logout}
							version={version}
							year={year}
						/>
					: isTablet ? 
						<TabletSettings
							error={error}
							form={form}
							version={version}
							year={year}	
						/>
					: 
						<DesktopSettings
							error={error}
							form={form}
							version={version}
							year={year}
						/>
					}
				</Row>
			</>
		);
	};
};

const DesktopSettings = Loadable({
	loader: () => import(/* webpackChunkName: "DesktopSettings" */ "../../templates/DesktopSettings"),
	loading: Loading,
	delay: 300
});

const MobileSettings = Loadable({
	loader: () => import(/* webpackChunkName: "MobileSettings" */ "../../templates/MobileSettings"),
	loading: Loading,
	delay: 300
});

const TabletSettings = Loadable({
	loader: () => import(/* webpackChunkName: "TabletSettings" */ "../../templates/TabletSettings"),
	loading: Loading,
	delay: 300
});

const Profile = Loadable({
	loader: () => import(/* webpackChunkName: "Profile" */ "../../reactors/Profile"),
	loading: Loading,
	delay: 300
});

const Password = Loadable({
	loader: () => import(/* webpackChunkName: "Password" */ "../../reactors/Password"),
	loading: Loading,
	delay: 300
});

const Preference = Loadable({
	loader: () => import(/* webpackChunkName: "Preference" */ "../../reactors/Preferences"),
	loading: Loading,
	delay: 300
});

const year = new Date().getFullYear();
const version = "Version 1.0.0-beta";

const mapStateToProps = state => ({
	error: state.error
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);