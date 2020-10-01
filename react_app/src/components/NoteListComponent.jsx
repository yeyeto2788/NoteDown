import React, { useEffect } from "react";
import { Container, CardColumns, Alert } from "react-bootstrap";
import axios from "axios";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";

import NoteComponent from "./NoteComponent";
import { getNoteByID } from "../utils";

const NoteList = (props) => {
  const [{ notes, currentNote, showAddButton, userToken }, dispatchAction] = useApplicationValue();

  const handleEditNote = (noteId) => {
    const note = getNoteByID(notes, noteId);

    dispatchAction({
      type: reducerActions.currentNote,
      item: noteId,
    });

    dispatchAction({
      type: reducerActions.currentNoteText,
      item: note.text,
    });

    dispatchAction({
      type: reducerActions.editorInUse,
      item: true,
    });

    dispatchAction({
      type: reducerActions.showAddButton,
      item: false,
    });
  };

  const handleDeleteNote = (noteId) => {
    const url = `${process.env.REACT_APP_NOTEDOWN_API_URL}/api/v1/notes/${noteId}`;
    axios
      .delete(url, { headers: { "X-API-KEY": userToken } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`An error occurred trying to fetch ${url}`);
        console.error(error);
      });

    dispatchAction({
      type: reducerActions.currentNoteText,
      item: null,
    });

    const newNotes = [...notes];

    for (let noteIndex in newNotes) {
      if (newNotes[noteIndex].id === noteId) {
        newNotes.splice(noteIndex, 1);
      }
    }

    dispatchAction({
      type: reducerActions.deleteNote,
      item: newNotes,
    });
  };

  const renderNotes = () => {
    let innerComponent;

    if (notes === null || typeof notes === "undefined" || notes === []) {
      innerComponent = (
        <Alert variant="dark">
          <Alert.Heading>Seems like there are no notes yet.</Alert.Heading>
          <p>Try creating a note on the button below.</p>
        </Alert>
      );
    } else {
      innerComponent = (
        <CardColumns>
          {notes.map((note) => (
            <NoteComponent
              key={note.id}
              text={note.text}
              date_created={note.date_created}
              date_edited={note.date_edited}
              onDeleteNote={() => {
                handleDeleteNote(note.id);
              }}
              onEditNote={() => {
                handleEditNote(note.id);
              }}
            ></NoteComponent>
          ))}
        </CardColumns>
      );
    }
    return <Container className="mt-3">{innerComponent}</Container>;
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_NOTEDOWN_API_URL}/api/v1/notes/`;
    axios
      .get(url, { headers: { "X-API-KEY": userToken } })
      .then((response) => {
        console.log(response);
        dispatchAction({
          type: reducerActions.addNote,
          item: response.data,
        });
      })
      .catch((error) => {
        console.error(`An error occurred trying to fetch ${url}`);
        console.error(error);
      });
  }, [currentNote, showAddButton]);

  return renderNotes();
};

export default NoteList;
