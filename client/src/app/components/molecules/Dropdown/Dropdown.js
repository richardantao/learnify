import React, { Component } from "react";

import { connect } from "react-redux";
import { getDefaultCalendar } from "../../../actions/interface/meta";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Dropdown as Drop, DropdownToggle, DropdownMenu, DropdownItem, NavLink, Nav} from "reactstrap";

class Dropdown extends Component {
    state = {
        isOpen: false,
        activeDisplay: null
    };

    static propTypes = {
        defaultCalendar: PropTypes.string
    };

    async componentDidMount() {
        const { getDefaultCalendar } = this.props;        
        await getDefaultCalendar();
    };

    componentDidUpdate(prevProps) {
        const { error, defaultCalendar } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(defaultCalendar !== prevProps.defaultCalendar) {
            this.setState({ activeDisplay: defaultCalendar });
        };
    };

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen});
    };

    render() {
        const { isOpen, activeDisplay } = this.state;

        return (
            <Drop isOpen={isOpen}>
                <DropdownToggle caret>
                    {activeDisplay}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink>
                            Month
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink>
                            Week
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink>
                            Week
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>
                        <NavLink>
                            Agenda
                        </NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </Drop>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error,
    defaultCalendar: state.meta.defaultCalendar
});

const mapDispatchToProps = { getDefaultCalendar, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);