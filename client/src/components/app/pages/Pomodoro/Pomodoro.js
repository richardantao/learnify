import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from "../../molecules/organisms/List";

import { } from "reactstrap";

class Pomodoro extends Component {
    state = {
        todos: [],
        inventory: [] 
    };

    static propTypes = {

    };

    componentDidUpdate(prevProps) {
        
    };

    render() {
        const { } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>Learnify | Pomodoro</title>
                </Helmet>
                <main>
                    <List/>
                    <List/>
                </main>
            </>
        );
    };
};

const mapStateToProps = state => ({

}); 

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);