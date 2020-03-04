import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchNotifications, } from "../../../../actions/app/notifications";
import PropTypes from "prop-types";

import { Collapse } from "reactstrap";

class Notifications extends Component {
    state = {
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        fetchNotifications: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { fetchNotifications } = this.props;
        fetchNotifications();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "NOTIFICATIONS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    render() {
        const { } = this.state;
        const { } = this.props;

        return (
            <>
                <Icon icon={faBell}/>

                <Collapse>
                
                </Collapse>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);