import React, { useState, useEffect } from 'react'
import { authors } from './authors'
import axios from 'axios'

//компонент добавления автора
const AuthorForm = (props) => {
  const [author, setAuthor] = useState('')
  function handleChange(e) {
    setAuthor(e.target.value)
  }
  function handleSubmit(e) {
    axios
      .post('https://localhost:7200/api/Author', {
        name: author,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setAuthor('')
    e.preventDefault()
    props.showBookForm()
  }
  return (
    <div className="authorform">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">ФИО автора:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={author}
          onChange={handleChange}
        />
        <input type="submit" value="Добавить" />
      </form>
    </div>
  )
}

export default AuthorForm
