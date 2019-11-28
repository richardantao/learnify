import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import styles from "./Tooltip.scss";

export default class TooltipReact extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
	
  render() {
    const classes = 'tooltip-inner'
    return (
      <div>
        <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
          Hello world!
        </Tooltip>
      </div>
    );
  }
}