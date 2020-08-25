export const initialState = {
  notes: null,
  currentNote: null,
  currentNoteText: null,
  editorInUse: false,
  showAddButton: true,
  currentUser: null,
  userToken: null,
};

export const reducerActions = {
  addNote: "ADD_NOTE",
  deleteNote: "DELETE_NOTE",
  editNote: "EDIT_NOTE",
  searchNotes: "SEARCH_NOTES",
  currentNote: "CURRENT_NOTE",
  currentNoteText: "CURRENT_NOTE_TEXT",
  editorInUse: "EDITOR_IN_USE",
  showAddButton: "SHOW_ADD_BUTTON",
  userChange: "USER_CHANGE",
  tokenChange: "TOKEN_CHANGE",
};

export default function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case reducerActions.addNote:
      return { ...state, notes: action.item };

    case reducerActions.deleteNote:
      return { ...state, notes: action.item };

    case reducerActions.searchNotes:
      return { ...state, notes: action.item };

    case reducerActions.currentNote:
      return { ...state, currentNote: action.item };

    case reducerActions.currentNoteText:
      return { ...state, currentNoteText: action.item };

    case reducerActions.editorInUse:
      return { ...state, editorInUse: action.item };

    case reducerActions.showAddButton:
      return { ...state, showAddButton: action.item };

    case reducerActions.userChange:
      return { ...state, currentUser: action.item };

    case reducerActions.tokenChange:
      return { ...state, userToken: action.item };

    default:
      return state;
  }
}
