import React from "react";
import { Col, Row } from "reactstrap";

/* Atoms */
import Button from "../Button";

/* Organisms */
import Modal from "../../organisms/Modal";

export default ({ key, className, title, parent, info, when, edit, terminate, onClick }) => {
    return (
        <Row key={key} className={className}>
            <Col className="data-primary">
                <h4>{title}</h4>
                <h5>{parent}</h5>
            </Col>
            <Col className="data-secondary">
                <p>{info}</p>
                <p>{when}</p>
            </Col>
            <Col className="data-actions">
                <Modal type="edit"/>
                {/* <Button type="button" content={edit} onClick={onClick}/>  */}
                {/* <Button type="button" content={terminate} onClick={onClick}/> */}
            </Col>
        </Row>
    );
};