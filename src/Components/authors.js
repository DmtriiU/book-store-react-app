import axios from "axios"

export let authors = [];
axios
  .get('https://localhost:7200/api/Author')
  .then((response) => {
      authors = response.data
  })
  .catch((err) => console.log(err))