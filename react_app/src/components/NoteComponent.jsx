import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const NoteComponent = (props) => {
  const { date, text } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{date}</Card.Title>
        {/* Translation from markdown to html */}
        <div>
          <ReactMarkdown source={text} />
        </div>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col></Col>
          <Col>
            <Button variant="secondary" onClick={props.onEditNote}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={props.onDeleteNote}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default NoteComponent;
