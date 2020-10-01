import axios from "axios";

export async function getNotes() {
  let notes;
  axios
    .get(`${process.env.REACT_APP_NOTEDOWN_API_URL}/api/v1/notes/`)
    .then((response) => {
      console.log(response);
      // notes = response.data;
    })
    .catch((error) => {
      notes = null;
    });

  return notes;
}
