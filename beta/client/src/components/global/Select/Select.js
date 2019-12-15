import React, { Component } from 'react';
import Select from 'react-select';

export default class SelectReact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    return <Select options={options} placeholder={this.props.placeholder}/>
  }
}
// options to be filled with the User's Courses
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
