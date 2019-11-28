import React, {Component} from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./LoadingColumn.scss";

export default class LoadingColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Loader
                type="TailSpin"
                color="#00BBFF"
                height={125}
                width={125}
            />
        )   
    }
}