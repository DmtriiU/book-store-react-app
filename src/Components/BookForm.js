import React, { useState, useEffect } from 'react'
import { authors } from './authors'
import axios from 'axios'

//компонент добавления новой книги в каталог
const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState(0)
  const [authors, setAuthors] = useState([])
  const [description, setDescription] = useState('')
  const [pageCount, setPageCount] = useState('')
  const [price, setPrice] = useState('')
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    axios
      .get('https://localhost:7200/api/Author')
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [authors])

  function handleTitle(e) {
    setTitle(e.target.value)
  }
  function handleAuthor(e) {
    setAuthor(e.target.value)
  }
  function handleDescription(e) {
    setDescription(e.target.value)
  }
  function handlePages(e) {
    setPageCount(e.target.value)
  }
  function handlePrice(e) {
    setPrice(e.target.value)
  }
  function handleSubmit(e) {
    console.log(author)
    axios
      .post('https://localhost:7200/api/Book', {
        title: title,
        description: description,
        pages: pageCount,
        price: price,
        authorId: author,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // books.unshift({
    //   title: title,
    //   description: description,
    //   pages: pageCount,
    //   price: price,
    //   authorId: author,
    // })
    setTitle('')
    setAuthor(0)
    setDescription('')
    setPageCount('')
    setPrice('')
    setItemCount(0)
    e.preventDefault()
    props.showCatalog()
  }
  return (
    <div className="bookform">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">Название: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
        <br />
        <label htmlFor="authors">Автор:</label>
        <select name="authors" id="authors" onChange={handleAuthor}>
          {authors.map((author) => {
            return (
              <option value={author.id}>
                {author.surname} {author.name}
              </option>
            )
          })}
        </select>
        <br />
        <label htmlFor="description">Описание:</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          onChange={handleDescription}
          value={description}
        ></textarea>
        <br />
        <label htmlFor="pages">Кол-во страниц:</label>
        <input
          type="number"
          name="pages"
          id="pages"
          value={pageCount}
          onChange={handlePages}
        />
        <br />
        <label htmlFor="price">Цена:</label>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handlePrice}
        />
        <br />
        <input type="submit" value="Добавить" />
      </form>
    </div>
  )
}

export default BookForm
