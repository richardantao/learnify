import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchNotifications, } from "../../../actions/data/notifications";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Collapse } from "reactstrap";

import { faBell } from "@fortawesome/free-solid-svg-icons";

import Icon from "../../atoms/Icon";

// import { } from "Notifications.module.scss";

class Notifications extends Component {
    state = {
        message: null
    };

    static propTypes = {
        error: PropTypes.object,
        fetchNotifications: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    async componentDidMount() {
        const { fetchNotifications, clearErrors } = this.props;
        await clearErrors();
        await fetchNotifications();
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

const mapDispatchToProps = { fetchNotifications, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);