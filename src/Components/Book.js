import React, { useEffect, useState } from 'react'
import PopUp from './PopUp'
import { authors } from './authors'
import UpdateForm from './UpdateForm'

//book component
const Book = (props) => {
  const [popUp, setPopUp] = useState(false)
  const [update, setUpdate] = useState(false)
  const removeBook = (id) => {
    console.log(id)
    props.handleRemove(id)
  }
  const showInfo = () => {
    setPopUp(true)
  }
  const closeInfo = () => {
    setPopUp(false)
  }
  const showUpdate = () => {
    setUpdate(true)
  }
  const closeUpdate = () => {
    setUpdate(false)
  }
  const addToCart = (id) => {
    console.log(id)
    props.addToCart(id)
  }
  return (
    <>
      <div key={props.book.id} className="book">
        <h1>{props.book.title}</h1>
        <h4>
          {authors.find((author) => author.id === props.book.authorId).name}{' '}
          {
            authors.find((author) => author.id === props.book.authorId)
              .patronymic
          }{' '}
          {authors.find((author) => author.id === props.book.authorId).surname}
        </h4>
        {/* <img
        className="bookimg"
        src={props.book.img}
        alt=""
        title={props.book.title}
      /> */}
        <div className="menu">
          <button onClick={() => addToCart(props.book.id)}>+ в корзину</button>
          <button onClick={() => removeBook(props.book.id)}>удалить</button>
          <button onClick={showUpdate}>обновить</button>
          <button onClick={showInfo}>информация</button>
        </div>
      </div>
      {popUp && <PopUp book={props.book} closeWindow={closeInfo}></PopUp>}
      {update && <UpdateForm book={props.book} closeUpdate={closeUpdate}></UpdateForm>}
    </>
  )
}

export default Book
