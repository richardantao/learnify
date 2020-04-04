import React from "react";
import Helmet from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

import "./NotFound.scss";

export default () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page could not be found."/>
                <meta name="keywords" content="Not, Found, Page"/>
                <title>Learnify | Page Not Found</title>
            </Helmet>
            <main role="main" id="not-found">
                { isMobile ? 
                    <MobileNotFound/>
                : isTablet ? 
                    <TabletNotFound/>
                :
                    <DesktopNotFound/>
                }
            </main>
        </>
    );
};

const DesktopNotFound = Loadable({
	loader: () => import(/* webpackChunkName: "DesktopNotFound" */ "../../templates/DesktopNotFound"),
	loading: () => <></>,
	delay: 300
});

const MobileNotFound = Loadable({
	loader: () => import(/* webpackChunkName: "MobileNotFound" */ "../../templates/MobileNotFound"),
	loading: () => <></>,
	delay: 300
});

const TabletNotFound = Loadable({
	loader: () => import(/* webpackChunkName: "TabletNotFound" */ "../../templates/TabletNotFound"),
	loading: () => <></>,
	delay: 300
});