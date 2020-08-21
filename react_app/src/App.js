import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import HeaderComponent from "./components/HeaderComponent";
import EditorComponent from "./components/EditorComponent";
import NoteList from "./components/NoteListComponent";
import { FloatingContainer, FloatingButton } from "./components/FloatingComponents";

import { useApplicationValue } from "./AppStateProvider";
import { reducerActions } from "./AppReducer";
import { findOnNotes } from "./utils";

const App = () => {
  const [
    { notes, editorInUse, showAddButton, currentNote },
    dispatchAction,
  ] = useApplicationValue();
  const initialSearchText = "Search on notes";
  const [searchText, changesearchText] = useState(initialSearchText);

  const handleAddNote = () => {
    dispatchAction({
      type: reducerActions.showAddButton,
      item: false,
    });

    dispatchAction({
      type: reducerActions.editorInUse,
      item: true,
    });
  };

  const handleCloseEditor = () => {
    alert("Are you sure you want to close the editor?");
    dispatchAction({
      type: reducerActions.showAddButton,
      item: true,
    });

    dispatchAction({
      type: reducerActions.editorInUse,
      item: false,
    });

    // Cleaning up all current values.
    if (currentNote !== null) {
      dispatchAction({
        type: reducerActions.currentNote,
        item: null,
      });

      dispatchAction({
        type: reducerActions.currentNoteText,
        item: null,
      });
    }
  };

  const handleSearch = () => {
    let notesFound = findOnNotes(notes, searchText);

    changesearchText(initialSearchText);
    document.getElementById("searchBox").value = "";

    dispatchAction({
      type: reducerActions.searchNotes,
      item: notesFound,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting.");
  };

  useEffect(() => {}, [showAddButton, editorInUse]);

  return (
    <div>
      <HeaderComponent
        placeholder={searchText}
        onSearch={handleSearch}
        OnSearchChange={(event) => {
          changesearchText(event.target.value);
        }}
        onSubmit={handleSubmit}
      ></HeaderComponent>

      {editorInUse ? (
        <EditorComponent onCloseEditor={handleCloseEditor}></EditorComponent>
      ) : (
        <NoteList></NoteList>
      )}

      {showAddButton ? (
        <FloatingContainer key="addButtonContainer">
          <FloatingButton
            tooltip="Add note"
            rotate={false}
            onClick={handleAddNote}
            styles={{ backgroundColor: "#007BFF", color: "#D5D5D5" }}
          />
        </FloatingContainer>
      ) : null}
    </div>
  );
};

export default App;
