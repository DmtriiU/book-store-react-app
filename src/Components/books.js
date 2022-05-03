import axios from 'axios'

export let books = []
axios
  .get('https://localhost:7200/api/Book')
  .then((response) => {
    books = response.data
  })
  .catch((err) => console.log(err))
