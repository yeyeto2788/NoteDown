export function getNoteByID(notes, noteID) {
  let noteFound;

  for (let noteIndex in notes) {
    if (notes[noteIndex].id === noteID) {
      noteFound = notes[noteIndex];
    }
  }

  return noteFound;
}

export function findOnNotes(notes, text) {
  let noteFound = [];

  for (let noteIndex in notes) {
    let noteID = notes[noteIndex].id;
    let noteText = notes[noteIndex].text;
    if (noteID.toString().includes(text.toLowerCase()) || noteText.includes(text.toLowerCase())) {
      noteFound.push(notes[noteIndex]);
    }
  }

  if (noteFound.length === 0) {
    noteFound = null;
  }

  return noteFound;
}
