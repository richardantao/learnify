import React from "react";

import Loadable from "react-loadable";

import "./HelpHeader.scss";

const HelpHeader = props => {
    return (
        <>
            
        </>
    );
};

const Bugs = Loadable({
    loader: () => import(/* webpackChunkName: "Bugs" */ "../Bugs"),
    loading: () => <div></div>
});

const Feedback = Loadable({
    loader: () => import(/* webpackChunkName: "Feedback" */ "../Feedback"),
    loading: () => <div></div>
});

export default HelpHeader;