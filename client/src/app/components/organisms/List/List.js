import React from "react";
import { Col } from "reactstrap";

/* -- Atoms -- */
import Empty from "../../atoms/Empty";

/* -- Organisms -- */
import ListHeader from "../../molecules/ListHeader";
import ListBody from "../../molecules/ListBody";

import "./List.module.scss";

export default ({ id, className, header, action, data, empty }) => {
    return (
        <Col id={id} className={className}>
            <ListHeader
                header={header}
                action={action}
            />
            <hr/>
            <ListBody
                data={ data ? data : <Empty empty={empty}/>}
            />
        </Col>
    );
};