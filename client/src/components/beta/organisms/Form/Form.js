import React from "react";
import { Form } from "reactstrap";

const Form = props => {
    return <Form onSubmit={props.handleSubmit}></Form>
};

export default Form;