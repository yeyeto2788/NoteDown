import axios from "axios";

export async function getNotes() {
  let notes;
  axios
    .get("http://localhost:8080/api/v1/notes/")
    .then((response) => {
      console.log(response);
      // notes = response.data;
    })
    .catch((error) => {
      notes = null;
    });

  return notes;
}
