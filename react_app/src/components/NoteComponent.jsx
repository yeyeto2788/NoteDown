import React from "react";
import { Card, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "../utils";

const NoteComponent = (props) => {
  const { date_created, date_edited, text } = props;

  return (
    <Card>
      <Card.Body>
        {/* Translation from markdown to html */}
        <div>
          <ReactMarkdown source={text} disallowedTypes={["image"]} />
        </div>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={date_created}>{date_created}</Tooltip>}
            >
              <Col className="text-muted">
                <Row>
                  <strong>Created: </strong>
                </Row>
                <Row>
                  <small>{formatDate(date_created)}</small>
                </Row>
              </Col>
            </OverlayTrigger>
          </Col>
          <Col>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={date_edited}>{date_edited}</Tooltip>}
            >
              <Col className="text-muted">
                <Row>
                  <strong>Updated: </strong>
                </Row>
                <Row>
                  <small>{formatDate(date_edited)}</small>
                </Row>
              </Col>
            </OverlayTrigger>
          </Col>
          <Col className="align-self-center">
            <Row>
              <Button variant="secondary" onClick={props.onEditNote}>
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button className="ml-1" variant="danger" onClick={props.onDeleteNote}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default NoteComponent;
