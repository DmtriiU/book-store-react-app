import React, { useState } from 'react'
import { authors } from './authors'
import axios from 'axios'

function UpdateForm(props) {
  const [id, setId] = useState(props.book.id)
  const [title, setTitle] = useState(props.book.title)
  const [author, setAuthor] = useState(props.book.authorId)
  const [description, setDescription] = useState(props.book.description)
  const [pageCount, setPageCount] = useState(props.book.pages)
  const [price, setPrice] = useState(props.book.price)
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
  function closePopUp() {
    props.closeUpdate()
  }
  function handleSubmit(e) {
    console.log(author)
    axios
      .put('https://localhost:7200/api/Book', {
        id: id,
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
    //   ...books,
    //   id: books.length + 1,
    //   title: title,
    //   author: author,
    //   description: description,
    //   pageCount: pageCount,
    //   price: price,
    //   itemCount: 0,
    // })
    setTitle('')
    setAuthor(0)
    setDescription('')
    setPageCount('')
    setPrice('')
    e.preventDefault()
    props.closeUpdate()
  }
  return (
    <div class="popups">
      <div class="content">
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
              {console.log(authors)}
              {authors.map((author) => {
                return (
                  <option
                    value={author.id}
                    selected={author.id == props.book.authorId}
                  >
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
            <input id="save" type="submit" value="Сохранить"/>
          </form>
        </div>
        <a class="close" href="#" onClick={closePopUp}>
          &times;
        </a>
      </div>
    </div>
  )
}

export default UpdateForm
