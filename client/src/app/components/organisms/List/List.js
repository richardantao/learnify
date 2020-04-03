import React from "react";
import { Col } from "reactstrap";

/* -- Atoms -- */
import Empty from "../../atoms/Empty";

/* -- Organisms -- */
import ListHeader from "../../molecules/ListHeader";
import ListBody from "../../molecules/ListBody";

import "./List.scss";

export default ({ id, className, header, action, data, empty, needHeader }) => {
    return (
        <Col id={id} className={className}>
            { needHeader ? (
                <>
                    <ListHeader
                    header={header}
                    action={action}
                    />
                    <hr/>
                    <ListBody
                        data={ data ? data : <Empty empty={empty}/>}
                    />
                </>
            ): (
                <ListBody
                    data={ data ? data : <Empty empty={empty}/>}
                />
            )}            
        </Col>
    );
};