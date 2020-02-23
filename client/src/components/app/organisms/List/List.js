import React from "react";
import { Col } from "reactstrap";
import Empty from "../../atoms/Empty";

export default ({ id, className, data, empty }) => {
    return (
        <>
            { data ? (
                <Col id={id} className={className}>
                    {data}
                </Col>   
            ): <Empty empty={empty}/>}
        </>
    );
};