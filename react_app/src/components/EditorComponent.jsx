import React, { useState } from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";

import "react-markdown-editor-lite/lib/index.css";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";

const EditorComponent = (props) => {
  const [{ currentNote, currentNoteText, userToken }, dispatchAction] = useApplicationValue();

  const mdEditor = React.useRef(null);
  const [localNoteText, setNoteText] = useState(currentNoteText ? currentNoteText : "");

  const handleSave = () => {
    let url, note, noteText;

    if (mdEditor.current) {
      noteText = mdEditor.current.getMdValue();

      if (currentNote !== null) {
        url = `http://localhost:8080/api/v1/notes/${currentNote}`;
      } else {
        url = `http://localhost:8080/api/v1/notes/`;
      }

      axios
        .post(url, null, {
          params: {
            text: noteText,
          },
          headers: { "X-API-KEY": userToken },
        })
        .then((response) => {
          note = response.data;
          console.log(`Successfully added note: ${note}`);
        })
        .catch((error) => {
          console.error(`An error occurred trying to fetch ${url}`);
          console.error(error);
          dispatchAction({
            type: reducerActions.editNote,
            item: null,
          });
        });
    }

    // Cleaning up all current values.
    dispatchAction({
      type: reducerActions.currentNote,
      item: null,
    });

    dispatchAction({
      type: reducerActions.currentNoteText,
      item: null,
    });

    dispatchAction({
      type: reducerActions.editorInUse,
      item: false,
    });

    dispatchAction({
      type: reducerActions.showAddButton,
      item: true,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    // Below: how we would normally read it
    // const newValue = text.replace(/\d/g, "");
    setNoteText(text);
  };

  return (
    <div className="mt-3 mx-3">
      <Editor
        ref={mdEditor}
        value={localNoteText}
        style={{
          height: "550px",
        }}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown source={text} />}
      />
      <Row className="mt-3 mr-3">
        <Col></Col>
        <Col md="auto">
          <Button onClick={props.onCloseEditor}>Close</Button>
        </Col>
        <Col md="auto">
          <Button onClick={handleSave}>Save</Button>
        </Col>
      </Row>
    </div>
  );
};

export default EditorComponent;
