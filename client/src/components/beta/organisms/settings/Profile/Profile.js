import React, { Component } from "react";

import { connect } from "react-redux";
import { editProfile, updateProfile } from "../../../../../actions/beta/users";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

import BetaDelete from "../../../auth/BetaDelete";

import "./Profile.scss";

class Profile extends Component {
	state = {
		first: "",
		last: "",
		email: "",
		country: "",
		region: "",
		institution: "",
		school: ""
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		editProfile: PropTypes.func.isRequired,
		updateProfile: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.editProfile();	
	};

	componentDidUpdate(prevProps) {

	};
	
	handleChange = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	handleCancel = () => {
		this.setState({

		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const { } = this.state;
		const { updateProfile } = this.props;

		const profile = {

		};

		updateProfile(profile);
	};

	render() {
		const { first, last, email, country, region, institution, school } = this.state;

		// const { countries, regions, institutions, schools } = this.state;

		// const countryOptions = countries.map(({_id, country}) => (
		// 	<option key={_id} value={country}>
		// 		{country}
		// 	</option>
		// ));

		// const regionOptions = regions.map(({_id, region}) => (
		// 	<option key={_id} value={region}>
		// 		{region}
		// 	</option>
		// ));
		// const institutionOptions = institutions.map(({_id, institution}) => (
		// 		<option key={_id} value={institution}>
		// 		{institution}
		// 	</option>
		// ));

		// const schoolOptions = schools.map(({_id, school}) => (
		// 	<option key={_id} value={school}>
		// 		{school}
		// 	</option>
		// ));

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row>
					<Col>
						<Label for="fname">First Name</Label>
						<Input 
							name="first" 
							type="text" 
							onChange={this.handleChange}
							value={first}
						/>
					</Col>
					<Col>
						<Label for="last">Last Name</Label>
						<Input 
							name="last" 
							type="text" 
							onChange={this.handleChange}
							value={last}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Email</Label>
						<Input 
							type="email" 
							name="email" 
							onChange={this.handleChange}
							value={email}
						/>
					</Col>
					<Col>
					
					</Col>
				</Row>
				<Row>
					<Col>
						<Label for="country">Country</Label>
						{/* <Select name="country" value={country}> */}
							{/* {countryOptions} */}
						{/* </Select> */}
					</Col>
					<Col>
						<Label for="region">Province/State</Label>				
						{/* <Select name="region" value={region}> */}
							{/* {regionOptions} */}
						{/* </Select> */}
					</Col>
				</Row>
				<Row>
					<Col>
						<Label for="institution">Institution</Label>
						{/* <Select name="institution" value={institution}> */}
							{/* {institutionOptions} */}
						{/* </Select> */}
					</Col>
					<Col>
						<Label for="school">School</Label>
						{/* <Select name="school" value={school}> */}
							{/* {schoolOptions} */}
						{/* </Select> */}
					</Col>
				</Row>
				<Row>
					<BetaDelete/>
				</Row>
				<Row>
					<Col>
						<Button type="button" onClick={this.handleCancel}>Cancel Changes</Button>
						<Button type="submit">Save Changes</Button>
					</Col>
				</Row>
			</Form>
		);
	};
};

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { editProfile, updateProfile, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

