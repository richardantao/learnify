import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchNotifications, } from "../../../actions/data/notifications";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Collapse } from "reactstrap";

import { faBell } from "@fortawesome/free-solid-svg-icons";

import Icon from "../../atoms/Icon";

import "./Notifications.scss";

class Notifications extends Component {
    state = {
        isOpen: false,
        message: null
    };

    static propTypes = {
        error: PropTypes.object,
        fetchNotifications: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    async componentDidMount() {
        const { clearErrors } = this.props;
        await clearErrors();
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

    toggle = () => {
        const { isOpen } = this.state;
        const { fetchNotifications } = this.props;

        if(isOpen) { 
            fetchNotifications();
        };

        this.setState({ isOpen: !isOpen });
    };

    render() {
        const { isOpen, message } = this.state;
        const { } = this.props;

        return (
            <>
                <Icon icon={faBell}/>

                <Collapse isOpen={isOpen}>
                    { message ? 
                      <div>{message}</div> 
                    : 
                      <>
                          {/* define notifications here */}
                      </> 
                    }
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