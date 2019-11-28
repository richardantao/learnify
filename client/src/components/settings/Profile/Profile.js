import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../../actions/data/settings.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

import Button from "../../global/Button";
import Select from "../../global/Select";
import "./Profile.scss";

class Profile extends Component {
	state = {
		first: "",
		last: "",
		email: "",
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		fetchProfile: PropTypes.func.isRequired,
		updateProfile: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.fetchProfile();	
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

		const revisedProfile = {

		};

		this.props.updateProfile(revisedProfile);
	};

	render() {
		const { countries, regions, institutions, schools } = this.state;

		const countryOptions = countries.map(({_id, country}) => (
			<option key={_id} value={country}>
				{country}
			</option>
		));

		const regionOptions = regions.map(({_id, region}) => (
			<option key={_id} value={region}>
				{region}
			</option>
		));
		const institutionOptions = institutions.map(({_id, institution}) => (
				<option key={_id} value={institution}>
				{institution}
			</option>
		));

		const schoolOptions = schools.map(({_id, school}) => (
			<option key={_id} value={school}>
				{school}
			</option>
		));

		return(
			<Form onSubmit={this.handleSubmit}>
				<Row>
					<Col>
						<Label for="fname">First Name</Label>
						<Input 
						name="fname" 
						type="text" 
						onChange={this.handleChange}
						/>
					</Col>
					<Col>
						<Label for="lname">Last Name</Label>
						<Input 
						name="lname" 
						type="text" 
						onChange={this.handleChange}
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
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label for="country">Country</Label>
						<Select name="country" value="">
							{countryOptions}
						</Select>
					</Col>
					<Col>
						<Label for="region">Province/State</Label>				
						<Select name="region" value="">
							{regionOptions}
						</Select>
					</Col>
				</Row>
				<Row>
					<Col>
						<Label for="institution">Institution</Label>
						<Select name="institution" value="">
							{institutionOptions}
						</Select>
					</Col>
					<Col>
						<Label for="school">School</Label>
						<Select name="school" value="">
							{schoolOptions}
						</Select>
					</Col>
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
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { fetchProfile, updateProfile, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

