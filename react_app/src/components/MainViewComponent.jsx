import React, { useState, useEffect } from "react";

import HeaderComponent from "./HeaderComponent";
import EditorComponent from "./EditorComponent";
import NoteList from "./NoteListComponent";
import { FloatingContainer, FloatingButton } from "./FloatingComponents";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";
import { findOnNotes } from "../utils";

const MainViewComponent = () => {
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
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>

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

export default MainViewComponent;
