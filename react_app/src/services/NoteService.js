import axios from "axios";

export async function getNotes() {
  let notes;
  axios
    .get(`/api/v1/notes/`)
    .then((response) => {
      console.log(response);
      // notes = response.data;
    })
    .catch((error) => {
      notes = null;
    });

  return notes;
}
